import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getUserLocation, searchCities } from './locationService';

describe('locationService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch location data from the correct development URL', async () => {
    const mockData = {
      city: 'Medellin',
      country: 'Colombia',
      latitude: 6.24861,
      longitude: -75.57425,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getUserLocation();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/location');
    expect(result).toEqual(mockData);
  });

  it('should return parsed location data', async () => {
    const mockData = {
      city: 'New York',
      country: 'United States',
      latitude: 40.7128,
      longitude: -74.006,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getUserLocation();

    expect(result.city).toBe('New York');
    expect(result.country).toBe('United States');
    expect(result.latitude).toBe(40.7128);
    expect(result.longitude).toBe(-74.006);
  });

  it('should throw an error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(getUserLocation()).rejects.toThrow('Error getting location');
  });

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(getUserLocation()).rejects.toThrow('Network error');
  });

  it('should log error to console when request fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(fetch).mockRejectedValue(new Error('API Error'));

    try {
      await getUserLocation();
    } catch (e) {}

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error getting location:',
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });

  it('should handle JSON parsing correctly', async () => {
    const mockData = {
      city: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    } as unknown as Response);

    const result = await getUserLocation();

    expect(result).toEqual(mockData);
  });

  describe('Production URL behavior', () => {
    it('should fetch from production URL when PROD is true', async () => {
      const mockData = {
        city: 'Berlin',
        country: 'Germany',
        latitude: 52.52,
        longitude: 13.405,
      };

      vi.stubGlobal('fetch', vi.fn());
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

      vi.stubEnv('PROD', true);
      const { getUserLocation: getUserLocationProd } =
        await import('./locationService');

      const result = await getUserLocationProd();

      expect(fetch).toHaveBeenCalledWith(
        'https://leslies-weather-app.vercel.app/api/location',
      );
      expect(result).toEqual(mockData);

      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    });

    it('should handle errors in production the same way', async () => {
      vi.stubGlobal('fetch', vi.fn());
      vi.mocked(fetch).mockRejectedValue(new Error('Production error'));

      vi.stubEnv('PROD', true);
      const { getUserLocation: getUserLocationProd } =
        await import('./locationService');

      await expect(getUserLocationProd()).rejects.toThrow('Production error');

      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    });
  });
});

describe('searchCities', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch cities from Open-Meteo API with correct URL', async () => {
    const mockData = {
      results: [
        {
          name: 'New York',
          country: 'United States',
          latitude: 40.7128,
          longitude: -74.006,
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await searchCities('New York');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://geocoding-api.open-meteo.com/v1/search'),
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('name=New+York'),
    );
  });

  it('should return parsed location data from search results', async () => {
    const mockData = {
      results: [
        {
          name: 'London',
          country: 'United Kingdom',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        {
          name: 'Londonderry',
          country: 'United Kingdom',
          latitude: 55.0047,
          longitude: -7.1625,
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await searchCities('London');

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      city: 'London',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278,
    });
  });

  it('should include correct query parameters in API call', async () => {
    const mockData = { results: [] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await searchCities('Paris');

    const callUrl = (vi.mocked(fetch).mock.calls[0]?.[0] as string) ?? '';
    expect(callUrl).toContain('count=6');
    expect(callUrl).toContain('language=en');
  });

  it('should throw an error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
    } as Response);

    await expect(searchCities('Invalid')).rejects.toThrow(
      `Error getting the cities' information`,
    );
  });

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(searchCities('Tokyo')).rejects.toThrow('Network error');
  });

  it('should handle empty search results', async () => {
    const mockData = { results: [] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await searchCities('XYZ123NonexistentCity');

    expect(result).toEqual([]);
  });

  it('should handle results with multiple cities', async () => {
    const mockData = {
      results: [
        {
          name: 'Sydney',
          country: 'Australia',
          latitude: -33.8688,
          longitude: 151.2093,
        },
        {
          name: 'Sydney',
          country: 'Canada',
          latitude: 46.1645,
          longitude: -60.1917,
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await searchCities('Sydney');

    expect(result).toHaveLength(2);
    expect(result[0]?.country).toBe('Australia');
    expect(result[1]?.country).toBe('Canada');
  });
});
