import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DailyWeatherCardsSkeleton from './DailyWeatherCardsSkeleton.vue';
import { Card } from '@/components/ui/Card';

describe('DailyWeatherCardsSkeleton.vue', () => {
  it('renders the skeleton container', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    expect(wrapper.find('.daily-weather-section__cards-skeleton').exists()).toBe(true);
  });

  it('renders exactly 7 skeleton Card components', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    const cards = wrapper.findAllComponents(Card);
    expect(cards).toHaveLength(7);
  });

  it('passes correct props to each Card component', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    const cards = wrapper.findAllComponents(Card);
    
    cards.forEach((card) => {
      expect(card.props('variant')).toBe('outlined');
      expect(card.props('size')).toBe('md');
    });
  });

  it('applies skeleton-card class to each Card', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    const cards = wrapper.findAllComponents(Card);
    
    cards.forEach((card) => {
      expect(card.classes()).toContain('skeleton-card');
    });
  });

  it('applies correct container styles', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    const container = wrapper.find('.daily-weather-section__cards-skeleton');
    expect(container.exists()).toBe(true);
  });

  it('renders all cards with same variant and size', () => {
    const wrapper = mount(DailyWeatherCardsSkeleton);
    
    const cards = wrapper.findAllComponents(Card);
    const variants = cards.map(card => card.props('variant'));
    const sizes = cards.map(card => card.props('size'));
    
    expect(variants.every(variant => variant === 'outlined')).toBe(true);
    
    expect(sizes.every(size => size === 'md')).toBe(true);
  });
});
