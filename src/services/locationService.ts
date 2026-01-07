import type { LocationData, OpenMeteoSearchResult } from "@/types"

export const getUserLocation = async (): Promise<LocationData> => {
  try {
        const apiUrl = import.meta.env.PROD 
      ? 'https://leslies-weather-app.vercel.app/api/location'
      : 'http://localhost:3000/api/location';

    const response = await fetch(apiUrl);

    if(!response.ok) {
      throw new Error('Error getting location');
    }

    return response.json();
  } catch(error) {
    console.error('Error:', error);
    throw error;
  }
}

export const searchCities = async (query: string): Promise<LocationData[]> => {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.append('name', query);
  url.searchParams.append('count', '10');
  url.searchParams.append('language', 'en');

  const response = await fetch(url.toString());

  const data: { results: OpenMeteoSearchResult[] } = await response.json();

  return data.results.map((result) => ({
    city: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
};