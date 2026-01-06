import type { LocationData, WeatherData } from '../types/types';

export const getWeather = async (location: LocationData): Promise<WeatherData> => {
  try {
    const { latitude, longitude } = location;

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation');
    url.searchParams.append('daily', 'temperature_2m_max,temperature_2m_min,weather_code');
    url.searchParams.append('hourly', 'temperature_2m,weather_code');
    url.searchParams.append('timezone', 'auto');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
      current: {
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        relativeHumidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
      },
      daily: {
        time: data.daily.time,
        maxTemp: data.daily.temperature_2m_max,
        minTemp: data.daily.temperature_2m_min,
        weatherCode: data.daily.weather_code,
      },
      hourly: {
        time: data.hourly.time,
        temperature: data.hourly.temperature_2m,
        weatherCode: data.hourly.weather_code,
      },
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};