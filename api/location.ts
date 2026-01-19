import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const API_KEY = process.env.GEOLOCALIZATION_API_KEY;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  try {
    const apiResponse = await fetch(
      `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${API_KEY}`,
    );
    if (!apiResponse.ok) {
      throw new Error(`Error when calling the Geolocalization API`);
    }

    const data = await apiResponse.json();

    response.status(200).json({
      city: data.location.city,
      country: data.location.country_name,
      latitude: parseFloat(data.location.latitude),
      longitude: parseFloat(data.location.longitude),
    });
  } catch (error: unknown) {
    console.error('Error fetching location:', error);
    response.status(500).json({
      error: 'Unable to get the location',
    });
  }
}
