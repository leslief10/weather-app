import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrentWeatherMetricsSkeleton from './CurrentWeatherMetricsSkeleton.vue';

vi.mock('@/components/ui/Card', () => ({
  CurrentCard: {
    name: 'CurrentCard',
    template: '<div class="current-card" :data-label="label" :data-value="value" :data-unit="unit">{{ label }}: {{ value }}{{ unit }}</div>',
    props: ['label', 'value', 'unit'],
  },
}));

describe('CurrentWeatherMetricsSkeleton.vue', () => {
  it('should render the skeleton container', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);

    expect(wrapper.find('.current-weather-section__metrics-skeleton').exists()).toBe(true);
  });

  it('should render 4 skeleton cards', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    expect(cards).toHaveLength(4);
  });

  it('should render cards with correct labels', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.attributes('data-label')).toBe('Feels Like');
    expect(cards[1]?.attributes('data-label')).toBe('Humidity');
    expect(cards[2]?.attributes('data-label')).toBe('Wind');
    expect(cards[3]?.attributes('data-label')).toBe('Precipitation');
  });

  it('should render all cards with "-" as value', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    cards.forEach((card) => {
      expect(card.attributes('data-value')).toBe('-');
    });
  });

  it('should render all cards with empty unit', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    cards.forEach((card) => {
      expect(card.attributes('data-unit')).toBe('');
    });
  });

  it('should render cards in correct order', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    const expectedLabels = ['Feels Like', 'Humidity', 'Wind', 'Precipitation'];
    
    cards.forEach((card, index) => {
      expect(card.attributes('data-label')).toBe(expectedLabels[index]);
    });
  });

  it('should display correct text content for each card', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const cards = wrapper.findAll('.current-card');

    expect(cards[0]?.text()).toBe('Feels Like: -');
    expect(cards[1]?.text()).toBe('Humidity: -');
    expect(cards[2]?.text()).toBe('Wind: -');
    expect(cards[3]?.text()).toBe('Precipitation: -');
  });

  it('should have proper CSS class for styling', () => {
    const wrapper = mount(CurrentWeatherMetricsSkeleton);
    const container = wrapper.find('.current-weather-section__metrics-skeleton');

    expect(container.exists()).toBe(true);
    expect(container.element.tagName).toBe('DIV');
  });
});