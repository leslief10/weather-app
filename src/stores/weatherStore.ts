import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { getWeather } from '@/services/weatherService';
import type { WeatherData, LocationData } from '@/types';

export const useWeatherStore = defineStore('weather', () => {
  const currentLocation: Ref<LocationData | null> = ref(null);
  const weatherData: Ref<WeatherData | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  

    async function fetchWeather(location: LocationData) {
      loading.value = true;
      error.value = null;

      try {
        currentLocation.value = location;
        weatherData.value = await getWeather(location);
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch weather data';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const hourlyData = computed(() => {
      if (!weatherData.value?.hourly) return [];

      const { time, temperature, weatherCode } = weatherData.value.hourly;

      return time.map((hour, index) => ({
        hour: hour,
        temperature: Math.round(temperature[index] ?? 0),
        weatherCode: weatherCode[index] ?? 0,
      }));
    });

    const dailyData = computed(() => {
      if (!weatherData.value?.daily) return [];

      const {time, maxTemp, minTemp, weatherCode} = weatherData.value.daily;

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
      formattedDays
    }
});
