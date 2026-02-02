import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { ref } from 'vue';
import HourlyDropdown from './HourlyDropdown.vue';
import { List, ListItem } from '@/components/ui/List';

vi.mock('@/stores/weatherStore', () => ({
  useWeatherStore: vi.fn(),
}));

import { useWeatherStore } from '@/stores/weatherStore';

describe('HourlyDropdown.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dropdown container', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.hourly-dropdown').exists()).toBe(true);
  });

  it('renders List component', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findComponent(List).exists()).toBe(true);
  });

  it('passes correct size prop to List component', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const list = wrapper.findComponent(List);
    expect(list.props('size')).toBe('sm');
  });

  it('renders no ListItem components when formattedDays is empty', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findAllComponents(ListItem)).toHaveLength(0);
  });

  it('renders ListItem for each day in formattedDays', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findAllComponents(ListItem)).toHaveLength(5);
  });

  it('displays correct day names in ListItems', () => {
    const days = ['Monday', 'Tuesday', 'Wednesday'];
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(days),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);

    listItems.forEach((item, index) => {
      expect(item.text()).toBe(days[index]);
    });
  });

  it('passes interactive prop to ListItem components', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(['Monday', 'Tuesday']),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);

    listItems.forEach((item) => {
      expect(item.props('interactive')).toBe(true);
    });
  });

  it('uses day as key for v-for rendering', () => {
    const days = ['Monday', 'Tuesday', 'Wednesday'];
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(days),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);
    expect(listItems).toHaveLength(3);
  });

  it('emits selectDay event when ListItem is clicked', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(['Monday', 'Tuesday', 'Wednesday']),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);
    await listItems[0]?.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('selectDay');
    expect(wrapper.emitted('selectDay')?.[0]).toEqual(['Monday']);
  });

  it('emits selectDay event with correct day name for each item', async () => {
    const days = ['Monday', 'Tuesday', 'Wednesday'];
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(days),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);

    for (let i = 0; i < listItems.length; i++) {
      await listItems[i]?.trigger('click');
    }

    const emittedEvents = wrapper.emitted('selectDay');
    expect(emittedEvents).toHaveLength(3);
    expect(emittedEvents?.[0]).toEqual(['Monday']);
    expect(emittedEvents?.[1]).toEqual(['Tuesday']);
    expect(emittedEvents?.[2]).toEqual(['Wednesday']);
  });

  it('emits multiple selectDay events when items are clicked multiple times', async () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(['Monday', 'Tuesday']),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    const listItems = wrapper.findAllComponents(ListItem);

    await listItems[0]?.trigger('click');
    await listItems[1]?.trigger('click');
    await listItems[0]?.trigger('click');

    const emittedEvents = wrapper.emitted('selectDay');
    expect(emittedEvents).toHaveLength(3);
    expect(emittedEvents?.[0]).toEqual(['Monday']);
    expect(emittedEvents?.[1]).toEqual(['Tuesday']);
    expect(emittedEvents?.[2]).toEqual(['Monday']);
  });

  it('handles empty formattedDays gracefully', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref([]),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.hourly-dropdown').exists()).toBe(true);
    expect(wrapper.findComponent(List).exists()).toBe(true);
    expect(wrapper.findAllComponents(ListItem)).toHaveLength(0);
  });

  it('updates rendered items when formattedDays changes', async () => {
    const formattedDaysRef = ref(['Monday', 'Tuesday']);

    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: formattedDaysRef,
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.findAllComponents(ListItem)).toHaveLength(2);

    formattedDaysRef.value = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(ListItem)).toHaveLength(4);
  });

  it('applies correct CSS classes', () => {
    vi.mocked(useWeatherStore).mockReturnValue({
      formattedDays: ref(['Monday', 'Tuesday']),
    } as any);

    const wrapper = mount(HourlyDropdown, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(wrapper.find('.hourly-dropdown').exists()).toBe(true);
    expect(wrapper.find('.hourly-dropdown__list').exists()).toBe(true);
    expect(wrapper.find('.hourly-dropdown__item').exists()).toBe(true);
  });
});
