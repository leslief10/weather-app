import { ref } from 'vue';
import type { useWeatherStore } from '@/stores/weatherStore';
import type {
  DailyCardProps,
  HourlyCardProps,
  LocationData,
  WeatherData,
} from '@/types';
import mockWeatherData from '@/mocks/data.json';

type WeatherStoreReturn = ReturnType<typeof useWeatherStore>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P] | undefined | null;
};

export interface MockWeatherStoreOptions {
  currentLocation?: LocationData | null;
  weatherData?: DeepPartial<WeatherData> | null;
  loading?: boolean;
  error?: string | null;
  hourlyData?: HourlyCardProps[] | null | undefined;
  dailyData?: DailyCardProps[] | null | undefined;
  formattedDays?: string[];
}

const defaultLocation: LocationData = {
  city: 'Toronto',
  country: 'Canada',
  latitude: 43.65,
  longitude: -79.38,
};

export function createMockWeatherStore(
  options: MockWeatherStoreOptions = {},
): WeatherStoreReturn {
  const currentLocation =
    'currentLocation' in options ? options.currentLocation : defaultLocation;
  const weatherData =
    'weatherData' in options ? options.weatherData : mockWeatherData;
  const loading = 'loading' in options ? options.loading : false;
  const error = 'error' in options ? options.error : null;
  const hourlyData = 'hourlyData' in options ? options.hourlyData : [];
  const dailyData = 'dailyData' in options ? options.dailyData : [];
  const formattedDays = 'formattedDays' in options ? options.formattedDays : [];

  return {
    currentLocation: ref(currentLocation),
    weatherData: ref(weatherData as WeatherData | null),
    loading: ref(loading),
    error: ref(error),
    hourlyData: ref(hourlyData),
    dailyData: ref(dailyData),
    formattedDays: ref(formattedDays),
    fetchWeather: vi.fn(),
    $id: 'weather',
    $state: {} as WeatherStoreReturn['$state'],
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(() => () => {}),
    $onAction: vi.fn(() => () => {}),
    $dispose: vi.fn(),
  } as unknown as WeatherStoreReturn;
}
