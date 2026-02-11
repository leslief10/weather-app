import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import WeatherIcon from './WeatherIcon.vue';
import { useWeatherIcon } from '@/composables/useWeatherIcon';

vi.mock('@/composables/useWeatherIcon');

describe('WeatherIcon', () => {
  const mockUseWeatherIcon = vi.mocked(useWeatherIcon);

  beforeEach(() => {
    mockUseWeatherIcon.mockReturnValue('icon-sunny');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render an img element', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
        },
      });

      expect(wrapper.find('img').exists()).toBe(true);
    });

    it('should call useWeatherIcon with the provided weatherCode', () => {
      mount(WeatherIcon, {
        props: {
          weatherCode: 61,
        },
      });

      expect(mockUseWeatherIcon).toHaveBeenCalledWith(61);
    });

    it('should generate correct image path based on icon name', () => {
      mockUseWeatherIcon.mockReturnValue('icon-rain');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 61,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-rain.webp',
      );
    });
  });

  describe('Alt text', () => {
    it('should use correct alt text based on weather code', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
        },
      });

      expect(wrapper.find('img').attributes('alt')).toBe('Clear sky');
    });
  });

  describe('Size variants', () => {
    it('should apply default size class (md) when size prop is not provided', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
        },
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('weather-icon--md');
    });

    it('should apply sm size class when size is "sm"', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
          size: 'sm',
        },
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('weather-icon--sm');
    });

    it('should apply md size class when size is "md"', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
          size: 'md',
        },
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('weather-icon--md');
    });

    it('should apply lg size class when size is "lg"', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
          size: 'lg',
        },
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('weather-icon--lg');
    });

    it('should always include base weather-icon class', () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
          size: 'lg',
        },
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('weather-icon');
    });
  });

  describe('Different weather conditions', () => {
    it('should render correct icon for cloudy weather', () => {
      mockUseWeatherIcon.mockReturnValue('icon-partly-cloudy');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 2,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-partly-cloudy.webp',
      );
      expect(wrapper.find('img').attributes('alt')).toBe('Partly cloudy');
    });

    it('should render correct icon for rainy weather', () => {
      mockUseWeatherIcon.mockReturnValue('icon-rain');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 61,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-rain.webp',
      );
      expect(wrapper.find('img').attributes('alt')).toBe('Slight rain');
    });

    it('should render correct icon for snowy weather', () => {
      mockUseWeatherIcon.mockReturnValue('icon-snow');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 71,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-snow.webp',
      );
      expect(wrapper.find('img').attributes('alt')).toBe('Slight snow fall');
    });

    it('should render correct icon for stormy weather', () => {
      mockUseWeatherIcon.mockReturnValue('icon-storm');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 95,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-storm.webp',
      );
      expect(wrapper.find('img').attributes('alt')).toBe('Thunderstorm');
    });
  });

  describe('Reactivity', () => {
    it('should update icon when weatherCode prop changes', async () => {
      mockUseWeatherIcon.mockReturnValue('icon-sunny');

      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
        },
      });

      expect(wrapper.find('img').attributes('src')).toBe(
        '/icon-sunny.webp',
      );

      mockUseWeatherIcon.mockReturnValue('icon-rain');
      await wrapper.setProps({ weatherCode: 61 });

      expect(mockUseWeatherIcon).toHaveBeenCalledWith(61);
    });

    it('should update size class when size prop changes', async () => {
      const wrapper = mount(WeatherIcon, {
        props: {
          weatherCode: 0,
          size: 'sm',
        },
      });

      expect(wrapper.find('img').classes()).toContain('weather-icon--sm');

      await wrapper.setProps({ size: 'lg' });

      expect(wrapper.find('img').classes()).toContain('weather-icon--lg');
      expect(wrapper.find('img').classes()).not.toContain('weather-icon--sm');
    });
  });
});
