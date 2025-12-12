import type { LocationData } from "../types/types"

export const getUserLocation = async (): Promise<LocationData> => {
  try {
    const response = await fetch('api/location');

    if(!response.ok) {
      throw new Error('Error getting location');
    }

    return response.json();
  } catch(error) {
    console.error('Error:', error);
    throw error;
  }
}
