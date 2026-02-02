import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { ref } from 'vue';
import CurrentWeatherMetrics from './CurrentWeatherMetrics.vue';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

vi.mock('@/components/ui/Card', () => ({
  CurrentCard: {
    name: 'CurrentCard',
    template:
      '<div class="current-card" :data-label="label">{{ value }}{{ unit }}</div>',
    props: ['label', 'value', 'unit'],
  },
}));

vi.mock('@/components/CurrentWeatherSection', () => ({
  CurrentWeatherMetricsSkeleton: {
    name: 'CurrentWeatherMetricsSkeleton',
    template: '<div class="skeleton">Loading...</div>',
  },
}));

describe('CurrentWeatherMetrics.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render skeleton when loading is true', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      loading: ref(true),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton').exists()).toBe(true);
    expect(wrapper.find('.current-weather-section__metrics').exists()).toBe(
      false,
    );
  });

  it('should render skeleton when weatherData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton').exists()).toBe(true);
    expect(wrapper.find('.current-weather-section__metrics').exists()).toBe(
      false,
    );
  });

  it('should render weather metrics when data is available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: 25.5,
          relativeHumidity: 65,
          windSpeed: 15.3,
          windSpeedUnit: 'km/h',
          precipitation: 0.5,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.skeleton').exists()).toBe(false);
    expect(wrapper.find('.current-weather-section__metrics').exists()).toBe(
      true,
    );
    expect(wrapper.findAll('.current-card')).toHaveLength(4);
  });

  it('should display correct card labels', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: 25.5,
          relativeHumidity: 65,
          windSpeed: 15.3,
          windSpeedUnit: 'km/h',
          precipitation: 0.5,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.attributes('data-label')).toBe('Feels Like');
    expect(cards[1]?.attributes('data-label')).toBe('Humidity');
    expect(cards[2]?.attributes('data-label')).toBe('Wind');
    expect(cards[3]?.attributes('data-label')).toBe('Precipitation');
  });

  it('should format and round numeric values correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: 25.5,
          relativeHumidity: 65,
          windSpeed: 15.3,
          windSpeedUnit: 'km/h',
          precipitation: 0.5,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toContain('26°');
    expect(cards[1]?.text()).toContain('65%');
    expect(cards[2]?.text()).toContain('15km/h');
    expect(cards[3]?.text()).toContain('1mm');
  });

  it('should display "-" for undefined values', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: undefined,
          relativeHumidity: undefined,
          windSpeed: undefined,
          windSpeedUnit: 'km/h',
          precipitation: undefined,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toBe('-');
    expect(cards[1]?.text()).toBe('-');
    expect(cards[2]?.text()).toContain('-');
    expect(cards[3]?.text()).toContain('-');
  });

  it('should display "-" for null values', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: null,
          relativeHumidity: null,
          windSpeed: null,
          windSpeedUnit: 'km/h',
          precipitation: null,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toBe('-');
    expect(cards[1]?.text()).toBe('-');
    expect(cards[2]?.text()).toContain('-');
    expect(cards[3]?.text()).toContain('-');
  });

  it('should not display unit when value is undefined', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: undefined,
          relativeHumidity: 50,
          windSpeed: undefined,
          windSpeedUnit: 'km/h',
          precipitation: undefined,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toBe('-');
    expect(cards[0]?.text()).not.toContain('°');
  });

  it('should handle zero values correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: {
          apparentTemperature: 0,
          relativeHumidity: 0,
          windSpeed: 0,
          windSpeedUnit: 'km/h',
          precipitation: 0,
          precipitationUnit: 'mm',
        },
      }),
      loading: ref(false),
    } as any);

    const wrapper = mount(CurrentWeatherMetrics, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toBe('0°');
    expect(cards[1]?.text()).toBe('0%');
    expect(cards[2]?.text()).toBe('0km/h');
    expect(cards[3]?.text()).toBe('0mm');
  });
});
