import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from './location';

describe('Location API Handler', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      end: vi.fn(),
      setHeader: vi.fn(),
    };

    process.env.GEOLOCALIZATION_API_KEY = 'test-api-key';
  });

  it('should set CORS headers on every request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        location: {
          city: 'Test City',
          country_name: 'Test Country',
          latitude: '10.5',
          longitude: '-20.5',
        },
      }),
    });

    await handler(mockRequest, mockResponse);

    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Origin',
      '*',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Methods',
      'GET, OPTIONS',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Headers',
      'Content-Type',
    );
  });

  it('should handle OPTIONS request and return 200', async () => {
    mockRequest.method = 'OPTIONS';

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.end).toHaveBeenCalled();
  });

  it('should return location data on successful API call', async () => {
    const mockLocationData = {
      location: {
        city: 'Medellin',
        country_name: 'Colombia',
        latitude: '6.24861',
        longitude: '-75.57425',
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockLocationData,
    });

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      city: 'Medellin',
      country: 'Colombia',
      latitude: 6.24861,
      longitude: -75.57425,
    });
  });

  it('should return 500 error when API call fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Unable to get the location',
    });
  });

  it('should return 500 error when fetch throws an exception', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Unable to get the location',
    });
  });

  it('should call the correct API endpoint with API key', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        location: {
          city: 'Test',
          country_name: 'Test',
          latitude: '0',
          longitude: '0',
        },
      }),
    });

    await handler(mockRequest, mockResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.ipgeolocation.io/v2/ipgeo?apiKey=test-api-key',
    );
  });
});
