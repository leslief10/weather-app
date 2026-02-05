import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { getWeather } from '@/services/weatherService';
import { useUnitsStore } from '@/stores/unitsStore';
import type {
  DailyCardProps,
  HourlyCardProps,
  LocationData,
  WeatherData,
} from '@/types';

export const useWeatherStore = defineStore('weather', () => {
  const currentLocation = ref<LocationData | null>(null);
  const weatherData = ref<WeatherData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const unitsStore = useUnitsStore();

  async function fetchWeather(location: LocationData) {
    loading.value = true;
    error.value = null;

    try {
      currentLocation.value = location;
      weatherData.value = await getWeather(location, {
        temperatureUnit: unitsStore.temperatureUnit,
        windSpeedUnit: unitsStore.windSpeedUnit,
        precipitationUnit: unitsStore.precipitationUnit,
      });
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch weather data';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  watch(
    [
      () => unitsStore.temperatureUnit,
      () => unitsStore.windSpeedUnit,
      () => unitsStore.precipitationUnit,
    ],
    () => {
      if (currentLocation.value) {
        fetchWeather(currentLocation.value);
      }
    },
  );

  const hourlyData = computed((): HourlyCardProps[] => {
    if (!weatherData.value?.hourly) return [];

    const { time, temperature, weatherCode } = weatherData.value.hourly;

    return time.map((hour, index) => ({
      hour: hour,
      temperature: Math.round(temperature[index] ?? 0),
      weatherCode: weatherCode[index] ?? 0,
    }));
  });

  const dailyData = computed((): DailyCardProps[] => {
    if (!weatherData.value?.daily) return [];

    const { time, maxTemp, minTemp, weatherCode } = weatherData.value.daily;

    return time.map((date, index) => ({
      date: date,
      maxTemp: Math.round(maxTemp[index] ?? 0),
      minTemp: Math.round(minTemp[index] ?? 0),
      weatherCode: weatherCode[index] ?? 0,
    }));
  });

  const formattedDays = computed((): string[] => {
    if (!weatherData.value?.daily) return [];

    const { time } = weatherData.value.daily;

    return time.map((date) => {
      const dateString = `${date}T12:00:00`;
      const newDate = new Date(dateString);

      return newDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
    });
  });

  return {
    currentLocation,
    weatherData,
    loading,
    error,
    fetchWeather,
    hourlyData,
    dailyData,
    formattedDays,
  };
});
