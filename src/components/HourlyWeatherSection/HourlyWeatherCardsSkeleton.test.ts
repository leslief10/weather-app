import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HourlyWeatherCardsSkeleton from './HourlyWeatherCardsSkeleton.vue';
import { Card } from '@/components/ui/Card';

describe('HourlyWeatherCardsSkeleton.vue', () => {
  it('renders the skeleton container', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    expect(wrapper.find('.hourly-weather-section__data-skeleton').exists()).toBe(true);
  });

  it('renders exactly 24 Card components', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const cards = wrapper.findAllComponents(Card);
    expect(cards).toHaveLength(24);
  });

  it('passes correct props to each Card component', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);
    
    const cards = wrapper.findAllComponents(Card);
    
    cards.forEach((card) => {
      expect(card.props('variant')).toBe('outlined');
      expect(card.props('size')).toBe('sm');
    });
  });

  it('applies skeleton-card class to all Card components', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const cards = wrapper.findAllComponents(Card);
    
    cards.forEach(card => {
      expect(card.classes()).toContain('skeleton-card');
    });
  });

  it('applies correct CSS class to container', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const container = wrapper.find('.hourly-weather-section__data-skeleton');
    expect(container.exists()).toBe(true);
  });

  it('renders without any props', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAllComponents(Card)).toHaveLength(24);
  });

  it('all Card components are direct children of the skeleton container', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const container = wrapper.find('.hourly-weather-section__data-skeleton');
    const cards = container.findAllComponents(Card);
    
    expect(cards).toHaveLength(24);
  });

  it('does not render any text content', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const container = wrapper.find('.hourly-weather-section__data-skeleton');
    expect(container.text()).toBe('');
  });

  it('maintains consistent props across all cards', () => {
    const wrapper = mount(HourlyWeatherCardsSkeleton);

    const cards = wrapper.findAllComponents(Card);
    const firstCardProps = cards[0]?.props();
    
    cards.forEach(card => {
      expect(card.props()).toEqual(firstCardProps);
    });
  });
});
