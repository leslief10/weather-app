import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrentWeatherOverviewSkeleton from './CurrentWeatherOverviewSkeleton.vue';

describe('CurrentWeatherOverviewSkeleton.vue', () => {
  it('should render the skeleton container', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);

    expect(wrapper.find('.current-weather-skeleton').exists()).toBe(true);
  });

  it('should render the loading container', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);

    expect(wrapper.find('.loading-container').exists()).toBe(true);
  });

  it('should render loading text', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);
    const loadingText = wrapper.find('.loading-text');

    expect(loadingText.exists()).toBe(true);
    expect(loadingText.text()).toBe('Loading...');
  });

  it('should render loading dots container', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);

    expect(wrapper.find('.loading-dots').exists()).toBe(true);
  });

  it('should render exactly 3 loading dots', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);
    const dots = wrapper.findAll('.dot');

    expect(dots).toHaveLength(3);
  });

  it('should render all dots as span elements', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);
    const dots = wrapper.findAll('.dot');

    dots.forEach((dot) => {
      expect(dot.element.tagName).toBe('SPAN');
    });
  });

  it('should have proper structure hierarchy', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);
    
    const skeleton = wrapper.find('.current-weather-skeleton');
    const loadingContainer = skeleton.find('.loading-container');
    const loadingDots = loadingContainer.find('.loading-dots');
    const loadingText = loadingContainer.find('.loading-text');

    expect(skeleton.exists()).toBe(true);
    expect(loadingContainer.exists()).toBe(true);
    expect(loadingDots.exists()).toBe(true);
    expect(loadingText.exists()).toBe(true);
  });

  it('should have the correct CSS classes applied', () => {
    const wrapper = mount(CurrentWeatherOverviewSkeleton);

    expect(wrapper.classes()).toContain('current-weather-skeleton');
    expect(wrapper.find('.loading-container').classes()).toContain('loading-container');
    expect(wrapper.find('.loading-dots').classes()).toContain('loading-dots');
    expect(wrapper.find('.loading-text').classes()).toContain('loading-text');
  });
});