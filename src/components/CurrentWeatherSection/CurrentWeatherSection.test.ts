import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CurrentWeatherSection from './CurrentWeatherSection.vue';

vi.mock('@/components/CurrentWeatherSection', () => ({
  CurrentWeatherOverview: {
    name: 'CurrentWeatherOverview',
    template: '<div class="current-weather-overview">Overview</div>',
  },
  CurrentWeatherMetrics: {
    name: 'CurrentWeatherMetrics',
    template: '<div class="current-weather-metrics">Metrics</div>',
  },
}));

describe('CurrentWeatherSection.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render the section with correct class', () => {
    const wrapper = mount(CurrentWeatherSection);
    const section = wrapper.find('section');

    expect(section.exists()).toBe(true);
    expect(section.classes()).toContain('section');
    expect(section.classes()).toContain('current-weather-section');
  });

  it('should render as a semantic section element', () => {
    const wrapper = mount(CurrentWeatherSection);

    expect(wrapper.element.tagName).toBe('SECTION');
  });

  it('should render CurrentWeatherOverview component', () => {
    const wrapper = mount(CurrentWeatherSection);

    expect(wrapper.find('.current-weather-overview').exists()).toBe(true);
    expect(wrapper.find('.current-weather-overview').text()).toBe('Overview');
  });

  it('should render CurrentWeatherMetrics component', () => {
    const wrapper = mount(CurrentWeatherSection);

    expect(wrapper.find('.current-weather-metrics').exists()).toBe(true);
    expect(wrapper.find('.current-weather-metrics').text()).toBe('Metrics');
  });

  it('should render both child components', () => {
    const wrapper = mount(CurrentWeatherSection);

    expect(wrapper.find('.current-weather-overview').exists()).toBe(true);
    expect(wrapper.find('.current-weather-metrics').exists()).toBe(true);
  });

  it('should render child components in correct order', () => {
    const wrapper = mount(CurrentWeatherSection);
    const section = wrapper.find('section');
    const children = section.element.children;

    expect(children[0]?.className).toContain('current-weather-overview');
    expect(children[1]?.className).toContain('current-weather-metrics');
  });

  it('should have exactly 2 child components', () => {
    const wrapper = mount(CurrentWeatherSection);
    const section = wrapper.find('section');

    expect(section.element.children).toHaveLength(2);
  });
});
