import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { ref } from 'vue';
import DailyWeatherSection from './DailyWeatherSection.vue';
import { DailyCard } from '@/components/ui/Card';
import { DailyWeatherCardsSkeleton } from '@/components/DailyWeatherSection';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

describe('DailyWeatherSection.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the section title correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(null),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.daily-weather-section__title').text()).toBe(
      'Daily forecast',
    );
  });

  it('displays skeleton when loading is true', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(null),
      loading: ref(true),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(DailyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.daily-weather-section__cards').exists()).toBe(false);
  });

  it('displays skeleton when dailyData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(null),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(DailyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.daily-weather-section__cards').exists()).toBe(false);
  });

  it('displays skeleton when dailyData is undefined', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(undefined),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(DailyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.daily-weather-section__cards').exists()).toBe(false);
  });

  it('renders DailyCard components when data is available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref([
        { date: '2024-01-01', maxTemp: 20, minTemp: 10, weatherCode: 0 },
        { date: '2024-01-02', maxTemp: 22, minTemp: 12, weatherCode: 1 },
        { date: '2024-01-03', maxTemp: 18, minTemp: 8, weatherCode: 2 },
      ]),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(DailyWeatherCardsSkeleton).exists()).toBe(
      false,
    );
    expect(wrapper.find('.daily-weather-section__cards').exists()).toBe(true);
    expect(wrapper.findAllComponents(DailyCard)).toHaveLength(3);
  });

  it('passes correct props to DailyCard components', () => {
    const mockData = [
      { date: '2024-01-01', maxTemp: 25, minTemp: 15, weatherCode: 3 },
      { date: '2024-01-02', maxTemp: 28, minTemp: 18, weatherCode: 45 },
    ];

    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(mockData),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const cards = wrapper.findAllComponents(DailyCard);

    expect(cards[0]?.props()).toEqual({
      date: '2024-01-01',
      maxTemp: 25,
      minTemp: 15,
      weatherCode: 3,
    });

    expect(cards[1]?.props()).toEqual({
      date: '2024-01-02',
      maxTemp: 28,
      minTemp: 18,
      weatherCode: 45,
    });
  });

  it('uses date as key for v-for rendering', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref([
        { date: '2024-01-01', maxTemp: 20, minTemp: 10, weatherCode: 0 },
        { date: '2024-01-02', maxTemp: 22, minTemp: 12, weatherCode: 1 },
      ]),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const cards = wrapper.findAllComponents(DailyCard);
    expect(cards[0]?.props('date')).toBe('2024-01-01');
    expect(cards[1]?.props('date')).toBe('2024-01-02');
  });

  it('applies correct CSS classes', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref(null),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.section').exists()).toBe(true);
    expect(wrapper.find('.daily-weather-section').exists()).toBe(true);
    expect(wrapper.find('.daily-weather-section__title').exists()).toBe(true);
  });

  it('renders empty cards container when dailyData is empty array', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      dailyData: ref([]),
      loading: ref(false),
    } as any);

    const wrapper = mount(DailyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.daily-weather-section__cards').exists()).toBe(true);
    expect(wrapper.findAllComponents(DailyCard)).toHaveLength(0);
  });
});
