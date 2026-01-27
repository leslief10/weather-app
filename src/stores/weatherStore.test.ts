import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWeatherStore } from './weatherStore';
import { getWeather } from '@/services/weatherService';
import type { LocationData, WeatherData } from '@/types';

vi.mock('@/services/weatherService', () => ({
  getWeather: vi.fn(),
}));

describe('weatherStore - fetchWeather', () => {
  let store: ReturnType<typeof useWeatherStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useWeatherStore();
    vi.clearAllMocks();
  });

  const mockLocation: LocationData = {
    city: 'Test City',
    country: 'Test Country',
    latitude: 10.5,
    longitude: -20.5,
  };

  const mockWeatherData: WeatherData = {
    current: {
      time: '2026-01-23T11:45',
      temperature: 22.6,
      temperatureUnit: '°C',
      apparentTemperature: 25.7,
      apparentTemperatureUnit: '°C',
      relativeHumidity: 71,
      weatherCode: 3,
      windSpeed: 5.2,
      windSpeedUnit: 'km/h',
      precipitation: 0,
      precipitationUnit: 'mm'
    },
    hourly: {
      time: ['2024-01-01T00:00:00', '2024-01-01T01:00:00'],
      temperature: [20, 21],
      temperatureUnit: '°C',
      weatherCode: [0, 1],
    },
    daily: {
      time: ['2024-01-01', '2024-01-02'],
      maxTemp: [25, 26],
      maxTempUnit: '°C',
      minTemp: [15, 16],
      minTempUnit: '°C',
      weatherCode: [0, 1],
    },
  };

  it('should set loading to true initially and false after completion', async () => {
    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);

    expect(store.loading).toBe(false);

    const fetchPromise = store.fetchWeather(mockLocation);
    expect(store.loading).toBe(true);

    await fetchPromise;
    expect(store.loading).toBe(false);
  });

  it('should update currentLocation with provided location', async () => {
    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);

    await store.fetchWeather(mockLocation);

    expect(store.currentLocation).toEqual(mockLocation);
  });

  it('should call getWeather with correct location', async () => {
    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);

    await store.fetchWeather(mockLocation);

    expect(getWeather).toHaveBeenCalledWith(mockLocation);
    expect(getWeather).toHaveBeenCalledTimes(1);
  });

  it('should set weatherData on successful fetch', async () => {
    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);

    await store.fetchWeather(mockLocation);

    expect(store.weatherData).toEqual(mockWeatherData);
  });

  it('should reset error to null on new fetch attempt', async () => {
    vi.mocked(getWeather).mockRejectedValueOnce(new Error('First error'));
    await store.fetchWeather(mockLocation);
    expect(store.error).toBe('First error');

    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);
    await store.fetchWeather(mockLocation);

    expect(store.error).toBeNull();
  });

  it('should set error message on failure with Error instance', async () => {
    const errorMessage = 'Network error occurred';
    vi.mocked(getWeather).mockRejectedValue(new Error(errorMessage));

    await store.fetchWeather(mockLocation);

    expect(store.error).toBe(errorMessage);
    expect(store.weatherData).toBeNull();
  });

  it('should handle non-Error exceptions', async () => {
    vi.mocked(getWeather).mockRejectedValue('String error');

    await store.fetchWeather(mockLocation);

    expect(store.error).toBe('Failed to fetch weather data');
  });

  it('should set loading to false even when fetch fails', async () => {
    vi.mocked(getWeather).mockRejectedValue(new Error('Failed'));

    await store.fetchWeather(mockLocation);

    expect(store.loading).toBe(false);
  });

  it('should log error to console on failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Test error');
    vi.mocked(getWeather).mockRejectedValue(error);

    await store.fetchWeather(mockLocation);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    consoleErrorSpy.mockRestore();
  });

  describe('hourlyData', () => {
    it('should return empty array when weatherData is null', () => {
      expect(store.hourlyData).toEqual([]);
    });

    it('should return empty array when hourly data is missing', () => {
      store.weatherData = {
        hourly: null,
      } as any;

      expect(store.hourlyData).toEqual([]);
    });

    it('should transform hourly weather data correctly', () => {
      store.weatherData = {
        ...mockWeatherData,
        hourly: {
          time: ['2024-01-01T00:00:00', '2024-01-01T01:00:00', '2024-01-01T02:00:00'],
          temperature: [20.7, 21.3, 19.8],
          temperatureUnit: '°C',
          weatherCode: [0, 1, 2],
        },
      };

      expect(store.hourlyData).toEqual([
        { hour: '2024-01-01T00:00:00', temperature: 21, weatherCode: 0 },
        { hour: '2024-01-01T01:00:00', temperature: 21, weatherCode: 1 },
        { hour: '2024-01-01T02:00:00', temperature: 20, weatherCode: 2 },
      ]);
    });

    it('should handle missing data with fallback values', () => {
      store.weatherData = {
        ...mockWeatherData,
        hourly: {
          time: ['2024-01-01T00:00:00'],
          temperature: [],
          temperatureUnit: '°C',
          weatherCode: [],
        },
      };

      expect(store.hourlyData).toEqual([
        { hour: '2024-01-01T00:00:00', temperature: 0, weatherCode: 0 },
      ]);
    });
  });

  describe('dailyData', () => {
    it('should return empty array when weatherData is null', () => {
      expect(store.dailyData).toEqual([]);
    });

    it('should return empty array when daily data is missing', () => {
      store.weatherData = {
        daily: null,
      } as any;

      expect(store.dailyData).toEqual([]);
    });

    it('should transform daily weather data correctly', () => {
      store.weatherData = {
        ...mockWeatherData,
        daily: {
          time: ['2024-01-01', '2024-01-02', '2024-01-03'],
          maxTemp: [25.7, 26.3, 24.1],
          maxTempUnit: '°C',
          minTemp: [15.2, 16.8, 14.9],
          minTempUnit: '°C',
          weatherCode: [0, 1, 2],
        },
      };

      expect(store.dailyData).toEqual([
        { date: '2024-01-01', maxTemp: 26, minTemp: 15, weatherCode: 0 },
        { date: '2024-01-02', maxTemp: 26, minTemp: 17, weatherCode: 1 },
        { date: '2024-01-03', maxTemp: 24, minTemp: 15, weatherCode: 2 },
      ]);
    });

    it('should handle missing data with fallback values', () => {
      store.weatherData = {
        ...mockWeatherData,
        daily: {
          time: ['2024-01-01'],
          maxTemp: [],
          maxTempUnit: '°C',
          minTemp: [],
          minTempUnit: '°C',
          weatherCode: [],
        },
      };

      expect(store.dailyData).toEqual([
        { date: '2024-01-01', maxTemp: 0, minTemp: 0, weatherCode: 0 },
      ]);
    });
  });

  describe('formattedDays', () => {
    it('should return empty array when weatherData is null', () => {
      expect(store.formattedDays).toEqual([]);
    });

    it('should return empty array when daily data is missing', () => {
      store.weatherData = {
        daily: null,
      } as any;

      expect(store.formattedDays).toEqual([]);
    });

    it('should format dates as weekday names', () => {
      store.weatherData = {
        ...mockWeatherData,
        daily: {
          time: ['2024-01-01', '2024-01-02', '2024-01-03'],
          maxTemp: [25, 26, 24],
          maxTempUnit: '°C',
          minTemp: [15, 16, 14],
          minTempUnit: '°C',
          weatherCode: [0, 1, 2],
        },
      };

      const result = store.formattedDays;
      
      expect(result).toHaveLength(3);
      
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      result.forEach(day => {
        expect(validDays).toContain(day);
      });
    });
  });
});
