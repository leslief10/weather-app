import type { LocationData } from "../types/types"

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
