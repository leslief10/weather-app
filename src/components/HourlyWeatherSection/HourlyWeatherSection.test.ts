import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { ref } from 'vue';
import HourlyWeatherSection from './HourlyWeatherSection.vue';
import { IconButton } from '@/components/ui/Button';
import { HourlyCard } from '@/components/ui/Card';
import {
  HourlyDropdown,
  HourlyWeatherCardsSkeleton,
} from '@/components/HourlyWeatherSection';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

describe('HourlyWeatherSection.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the section title correctly', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref(null),
      formattedDays: ref([]),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.hourly-weather-section__title').text()).toBe(
      'Hourly forecast',
    );
  });

  it('displays skeleton when loading is true', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref(null),
      formattedDays: ref([]),
      loading: ref(true),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(HourlyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.hourly-weather-section__data').exists()).toBe(false);
  });

  it('displays skeleton when hourlyData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({ current: { time: '2024-01-01T12:00:00' } }),
      hourlyData: ref(null),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(HourlyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.hourly-weather-section__data').exists()).toBe(false);
  });

  it('displays skeleton when hourlyData is undefined', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({ current: { time: '2024-01-01T12:00:00' } }),
      hourlyData: ref(undefined),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(HourlyWeatherCardsSkeleton).exists()).toBe(
      true,
    );
    expect(wrapper.find('.hourly-weather-section__data').exists()).toBe(false);
  });

  it('renders HourlyCard components when data is available', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01', '2024-01-02'] },
      }),
      hourlyData: ref([
        { hour: '2024-01-01T08:00:00', temperature: 15, weatherCode: 0 },
        { hour: '2024-01-01T09:00:00', temperature: 16, weatherCode: 1 },
        { hour: '2024-01-01T10:00:00', temperature: 17, weatherCode: 2 },
      ]),
      formattedDays: ref(['Monday', 'Tuesday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(HourlyWeatherCardsSkeleton).exists()).toBe(
      false,
    );
    expect(wrapper.find('.hourly-weather-section__data').exists()).toBe(true);
    expect(wrapper.findAllComponents(HourlyCard)).toHaveLength(3);
  });

  it('passes correct props to HourlyCard components', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([
        { hour: '2024-01-01T08:00:00', temperature: 20, weatherCode: 3 },
        { hour: '2024-01-01T09:00:00', temperature: 22, weatherCode: 45 },
      ]),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const cards = wrapper.findAllComponents(HourlyCard);

    expect(cards[0]?.props()).toEqual({
      hour: '2024-01-01T08:00:00',
      temperature: 20,
      weatherCode: 3,
    });

    expect(cards[1]?.props()).toEqual({
      hour: '2024-01-01T09:00:00',
      temperature: 22,
      weatherCode: 45,
    });
  });

  it('initializes selectedDay from weatherData current time', () => {
    const currentTime = new Date('2024-01-01T12:00:00');
    const expectedDay = currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
    });

    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([]),
      formattedDays: ref([expectedDay]),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const button = wrapper.findComponent(IconButton);
    expect(button.text()).toContain(expectedDay);
  });

  it('sets selectedDay to "-" when loading', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref(null),
      formattedDays: ref([]),
      loading: ref(true),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const button = wrapper.findComponent(IconButton);
    expect(button.text()).toContain('-');
  });

  it('sets selectedDay to "-" when weatherData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref([]),
      formattedDays: ref([]),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const button = wrapper.findComponent(IconButton);
    expect(button.text()).toContain('-');
  });

  it('toggles dropdown visibility when IconButton is clicked', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([]),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const dropdown = wrapper.findComponent(HourlyDropdown);
    expect(dropdown.element.style.display).toBe('none');

    const button = wrapper.findComponent(IconButton);

    await button.trigger('click');

    expect(dropdown.element.style.display).not.toBe('none');

    await button.trigger('click');
    expect(dropdown.element.style.display).toBe('none');
  });

  it('disables IconButton when loading', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref(null),
      formattedDays: ref([]),
      loading: ref(true),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const button = wrapper.findComponent(IconButton);
    expect(button.props('disabled')).toBe(true);
  });

  it('disables IconButton when weatherData is null', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref([]),
      formattedDays: ref([]),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const button = wrapper.findComponent(IconButton);
    expect(button.props('disabled')).toBe(true);
  });

  it('handles day selection from dropdown', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01', '2024-01-02'] },
      }),
      hourlyData: ref([]),
      formattedDays: ref(['Monday', 'Tuesday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const dropdown = wrapper.findComponent(HourlyDropdown);
    await dropdown.vm.$emit('select-day', 'Tuesday');

    const button = wrapper.findComponent(IconButton);
    expect(button.text()).toContain('Tuesday');
    expect(dropdown.isVisible()).toBe(false);
  });

  it('filters hourly data by selected day', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01', '2024-01-02'] },
      }),
      hourlyData: ref([
        { hour: '2024-01-01T10:00:00', temperature: 15, weatherCode: 0 },
        { hour: '2024-01-01T11:00:00', temperature: 16, weatherCode: 1 },
        { hour: '2024-01-02T08:00:00', temperature: 18, weatherCode: 2 },
        { hour: '2024-01-02T09:00:00', temperature: 19, weatherCode: 3 },
      ]),
      formattedDays: ref(['Monday', 'Tuesday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findAllComponents(HourlyCard)).toHaveLength(2);

    const dropdown = wrapper.findComponent(HourlyDropdown);
    await dropdown.vm.$emit('select-day', 'Tuesday');

    expect(wrapper.findAllComponents(HourlyCard)).toHaveLength(2);
    const cards = wrapper.findAllComponents(HourlyCard);
    expect(cards[0]?.props('hour')).toBe('2024-01-02T08:00:00');
    expect(cards[1]?.props('hour')).toBe('2024-01-02T09:00:00');
  });

  it('returns empty array when dayIndex is not found', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([
        { hour: '2024-01-01T08:00:00', temperature: 15, weatherCode: 0 },
      ]),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const dropdown = wrapper.findComponent(HourlyDropdown);
    dropdown.vm.$emit('select-day', 'InvalidDay');

    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(HourlyCard)).toHaveLength(0);
  });

  it('applies correct CSS classes', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref(null),
      hourlyData: ref(null),
      formattedDays: ref([]),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.section').exists()).toBe(true);
    expect(wrapper.find('.hourly-weather-section').exists()).toBe(true);
    expect(wrapper.find('.hourly-weather-section__header').exists()).toBe(true);
    expect(wrapper.find('.hourly-weather-section__title').exists()).toBe(true);
  });

  it('uses hour as key for v-for rendering', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([
        { hour: '2024-01-01T08:00:00', temperature: 15, weatherCode: 0 },
        { hour: '2024-01-01T09:00:00', temperature: 16, weatherCode: 1 },
      ]),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    const cards = wrapper.findAllComponents(HourlyCard);
    expect(cards[0]?.props('hour')).toBe('2024-01-01T08:00:00');
    expect(cards[1]?.props('hour')).toBe('2024-01-01T09:00:00');
  });

  it('renders empty data container when filteredHourlyData is empty', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      weatherData: ref({
        current: { time: '2024-01-01T12:00:00' },
        daily: { time: ['2024-01-01'] },
      }),
      hourlyData: ref([]),
      formattedDays: ref(['Monday']),
      loading: ref(false),
    } as any);

    const wrapper = mount(HourlyWeatherSection, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.hourly-weather-section__data').exists()).toBe(true);
    expect(wrapper.findAllComponents(HourlyCard)).toHaveLength(0);
  });
});
