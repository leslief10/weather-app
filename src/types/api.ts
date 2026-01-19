export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface OpenMeteoSearchResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  temperatureUnit: string;
  apparentTemperature: number;
  apparentTemperatureUnit: string;
  relativeHumidity: number;
  weatherCode: number;
  windSpeed: number;
  windSpeedUnit: string;
  precipitation: number;
  precipitationUnit: string;
}

export interface DailyWeather {
  time: string[];
  maxTemp: number[];
  maxTempUnit: string;
  minTemp: number[];
  minTempUnit: string;
  weatherCode: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  temperatureUnit: string;
  weatherCode: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}
