import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getWeather } from './weatherService';
import type { LocationData } from '@/types';

describe('weatherService', () => {
  const mockLocation: LocationData = {
    city: 'Medellin',
    country: 'Colombia',
    latitude: 6.24861,
    longitude: -75.57425,
  };

  const mockOpenMeteoResponse = {
    current: {
      temperature_2m: 22.5,
      apparent_temperature: 21.0,
      relative_humidity_2m: 65,
      weather_code: 2,
      wind_speed_10m: 10,
      precipitation: 0,
    },
    current_units: {
      temperature_2m: '°C',
      apparent_temperature: '°C',
      wind_speed_10m: 'km/h',
      precipitation: 'mm',
    },
    daily: {
      time: ['2026-01-06', '2026-01-07', '2026-01-08'],
      temperature_2m_max: [25, 26, 24],
      temperature_2m_min: [18, 19, 17],
      weather_code: [2, 1, 3],
    },
    daily_units: {
      temperature_2m_max: '°C',
      temperature_2m_min: '°C',
    },
    hourly: {
      time: ['2026-01-06T00:00', '2026-01-06T01:00', '2026-01-06T02:00'],
      temperature_2m: [20, 19.5, 19],
      weather_code: [2, 2, 2],
    },
    hourly_units: {
      temperature_2m: '°C',
    },
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch weather data with correct coordinates', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    await getWeather(mockLocation);

    const callUrl = (vi.mocked(fetch).mock.calls[0]?.[0] as string) ?? '';
    expect(callUrl).toContain('latitude=6.24861');
    expect(callUrl).toContain('longitude=-75.57425');
  });

  it('should include all required query parameters', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    await getWeather(mockLocation);

    const callUrl = (vi.mocked(fetch).mock.calls[0]?.[0] as string) ?? '';
    expect(callUrl).toContain('temperature_2m');
    expect(callUrl).toContain('apparent_temperature');
    expect(callUrl).toContain('relative_humidity_2m');
    expect(callUrl).toContain('weather_code');
    expect(callUrl).toContain('wind_speed_10m');
    expect(callUrl).toContain('precipitation');
    expect(callUrl).toContain('timezone=auto');
  });

  it('should transform current weather data correctly', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    const result = await getWeather(mockLocation);

    expect(result.current.temperature).toBe(22.5);
    expect(result.current.temperatureUnit).toBe('°C');
    expect(result.current.apparentTemperature).toBe(21.0);
    expect(result.current.apparentTemperatureUnit).toBe('°C');
    expect(result.current.relativeHumidity).toBe(65);
    expect(result.current.weatherCode).toBe(2);
    expect(result.current.windSpeed).toBe(10);
    expect(result.current.windSpeedUnit).toBe('km/h');
    expect(result.current.precipitation).toBe(0);
    expect(result.current.precipitationUnit).toBe('mm');
  });

  it('should transform daily weather data correctly', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    const result = await getWeather(mockLocation);

    expect(result.daily.time).toEqual([
      '2026-01-06',
      '2026-01-07',
      '2026-01-08',
    ]);
    expect(result.daily.maxTemp).toEqual([25, 26, 24]);
    expect(result.daily.maxTempUnit).toBe('°C');
    expect(result.daily.minTemp).toEqual([18, 19, 17]);
    expect(result.daily.minTempUnit).toBe('°C');
    expect(result.daily.weatherCode).toEqual([2, 1, 3]);
  });

  it('should transform hourly weather data correctly', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    const result = await getWeather(mockLocation);

    expect(result.hourly.time).toEqual([
      '2026-01-06T00:00',
      '2026-01-06T01:00',
      '2026-01-06T02:00',
    ]);
    expect(result.hourly.temperature).toEqual([20, 19.5, 19]);
    expect(result.hourly.temperatureUnit).toBe('°C');
    expect(result.hourly.weatherCode).toEqual([2, 2, 2]);
  });

  it('should throw an error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getWeather(mockLocation)).rejects.toThrow(
      'Failed to fetch weather data',
    );
  });

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(getWeather(mockLocation)).rejects.toThrow('Network error');
  });

  it('should log error to console when request fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(fetch).mockRejectedValue(new Error('API Error'));

    try {
      await getWeather(mockLocation);
    } catch (e) {}

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching weather:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });

  it('should call the correct Open-Meteo endpoint', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    await getWeather(mockLocation);

    const callUrl = (vi.mocked(fetch).mock.calls[0]?.[0] as string) ?? '';
    expect(callUrl).toContain('https://api.open-meteo.com/v1/forecast');
  });

  it('should handle different locations', async () => {
    const newYorkLocation: LocationData = {
      city: 'New York',
      country: 'United States',
      latitude: 40.7128,
      longitude: -74.006,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockOpenMeteoResponse,
    } as unknown as Response);

    await getWeather(newYorkLocation);

    const callUrl = (vi.mocked(fetch).mock.calls[0]?.[0] as string) ?? '';
    expect(callUrl).toContain('latitude=40.7128');
    expect(callUrl).toContain('longitude=-74.006');
  });
});
