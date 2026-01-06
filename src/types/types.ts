export interface LocationData {
  city: string,
  country: string,
  latitude: number,
  longitude: number,
}

export   interface OpenMeteoSearchResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  weatherCode: number;
  windSpeed: number;
  precipitation: number;
}

export interface DailyWeather {
  time: string[];
  maxTemp: number[];
  minTemp: number[];
  weatherCode: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  weatherCode: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}