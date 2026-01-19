import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getUserLocation } from './locationService';

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

    expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
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
