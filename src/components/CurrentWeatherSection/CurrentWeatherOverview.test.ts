import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { ref } from 'vue';
import CurrentWeatherOverview from './CurrentWeatherOverview.vue';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

vi.mock('@/components/ui/Icons', () => ({
  WeatherIcon: {
    name: 'WeatherIcon',
    template:
      '<div class="weather-icon" :data-weather-code="weatherCode" :data-size="size">Icon</div>',
    props: ['weatherCode', 'size'],
  },
}));

vi.mock('@/components/CurrentWeatherSection', () => ({
  CurrentWeatherOverviewSkeleton: {
    name: 'CurrentWeatherOverviewSkeleton',
    template: '<div class="skeleton-overview">Loading...</div>',
  },
}));

describe('CurrentWeatherOverview.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render skeleton when loading is true', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      loading: ref(true),
      currentLocation: ref(null),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton-overview').exists()).toBe(true);
    expect(wrapper.find('.current-weather').exists()).toBe(false);
  });

  it('should render skeleton when weatherData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton-overview').exists()).toBe(true);
    expect(wrapper.find('.current-weather').exists()).toBe(false);
  });

  it('should render current weather when data is available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
          temperature: 22.6,
          temperatureUnit: '°C',
          weatherCode: 3,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton-overview').exists()).toBe(false);
    expect(wrapper.find('.current-weather').exists()).toBe(true);
  });

  it('should display formatted location', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
          temperature: 22.6,
          temperatureUnit: '°C',
          weatherCode: 3,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cityElement = wrapper.find('.current-weather__city');

    expect(cityElement.exists()).toBe(true);
    expect(cityElement.text()).toBe('Toronto, Canada');
  });

  it('should display "N/A" when location is not available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
          temperature: 22.6,
          temperatureUnit: '°C',
          weatherCode: 3,
        },
      }),
      loading: ref(false),
      currentLocation: ref(null),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cityElement = wrapper.find('.current-weather__city');

    expect(cityElement.text()).toBe('N/A');
  });

  it('should display formatted date', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const dateElement = wrapper.find('.current-weather__date');

    expect(dateElement.exists()).toBe(true);
    // The date format: "Thursday, Jan 23, 2026"
    expect(dateElement.text()).toMatch(/\w+, \w+ \d+, \d{4}/);
  });

  it('should display "N/A" when date is not available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: undefined,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const dateElement = wrapper.find('.current-weather__date');

    expect(dateElement.text()).toBe('N/A');
  });

  it('should render time element with datetime attribute', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const timeElement = wrapper.find('time');

    expect(timeElement.exists()).toBe(true);
    expect(timeElement.attributes('datetime')).toBe('2026-01-23T11:45');
  });

  it('should display formatted temperature', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          temperature: 22.6,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const temperatureElement = wrapper.find('.current-weather__temperature');

    expect(temperatureElement.exists()).toBe(true);
    expect(temperatureElement.text()).toBe('23°');
  });

  it('should round temperature correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          temperature: -5.3,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const temperatureElement = wrapper.find('.current-weather__temperature');

    expect(temperatureElement.text()).toBe('-5°');
  });

  it('should display "N/A" when temperature is not available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          temperature: undefined,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const temperatureElement = wrapper.find('.current-weather__temperature');

    expect(temperatureElement.text()).toBe('N/A');
  });

  it('should render WeatherIcon with correct props', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          weatherCode: 3,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const weatherIcon = wrapper.find('.weather-icon');

    expect(weatherIcon.exists()).toBe(true);
    expect(weatherIcon.attributes('data-weather-code')).toBe('3');
    expect(weatherIcon.attributes('data-size')).toBe('lg');
  });

  it('should use weather code 0 as fallback when not available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          weatherCode: undefined,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const weatherIcon = wrapper.find('.weather-icon');

    expect(weatherIcon.attributes('data-weather-code')).toBe('0');
  });

  it('should render location and details sections', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          time: '2026-01-23T11:45',
          temperature: 22.6,
          temperatureUnit: '°C',
          weatherCode: 3,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.current-weather__location').exists()).toBe(true);
    expect(wrapper.find('.current-weather__details').exists()).toBe(true);
  });

  it('should handle zero temperature correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          temperature: 0,
        },
      }),
      loading: ref(false),
      currentLocation: ref({
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.65,
        longitude: -79.38,
      }),
    } as any);

    const wrapper = mount(CurrentWeatherOverview, {
      global: {
        plugins: [createPinia()],
      },
    });
    const temperatureElement = wrapper.find('.current-weather__temperature');

    expect(temperatureElement.text()).toBe('0°');
  });
});
