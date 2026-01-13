import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '@/components/ui/Card/Card.vue';

describe('Card.vue', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const wrapper = mount(Card);
      
      expect(wrapper.find('article').exists()).toBe(true);
      expect(wrapper.classes()).toContain('card');
      expect(wrapper.classes()).toContain('card--outlined');
      expect(wrapper.classes()).toContain('card--md');
    });

    it('should render slot content', () => {
      const wrapper = mount(Card, {
        slots: {
          default: '<div class="test-content">Test Content</div>',
        },
      });
      
      expect(wrapper.find('.test-content').exists()).toBe(true);
      expect(wrapper.text()).toBe('Test Content');
    });
  });

  describe('Variants', () => {
    it('should apply elevated variant class', () => {
      const wrapper = mount(Card, {
        props: {
          variant: 'elevated',
        },
      });
      
      expect(wrapper.classes()).toContain('card--elevated');
      expect(wrapper.classes()).not.toContain('card--outlined');
    });

    it('should apply outlined variant class', () => {
      const wrapper = mount(Card, {
        props: {
          variant: 'outlined',
        },
      });
      
      expect(wrapper.classes()).toContain('card--outlined');
    });

    it('should apply flat variant class', () => {
      const wrapper = mount(Card, {
        props: {
          variant: 'flat',
        },
      });
      
      expect(wrapper.classes()).toContain('card--flat');
    });
  });

  describe('Sizes', () => {
    it('should apply small size class', () => {
      const wrapper = mount(Card, {
        props: {
          size: 'sm',
        },
      });
      
      expect(wrapper.classes()).toContain('card--sm');
    });

    it('should apply medium size class', () => {
      const wrapper = mount(Card, {
        props: {
          size: 'md',
        },
      });
      
      expect(wrapper.classes()).toContain('card--md');
    });

    it('should apply large size class', () => {
      const wrapper = mount(Card, {
        props: {
          size: 'lg',
        },
      });
      
      expect(wrapper.classes()).toContain('card--lg');
    });
  });

  describe('Props', () => {
    it('should apply id attribute', () => {
      const wrapper = mount(Card, {
        props: {
          id: 'test-card-id',
        },
      });
      
      expect(wrapper.attributes('id')).toBe('test-card-id');
    });

    it('should apply data-testid attribute', () => {
      const wrapper = mount(Card, {
        props: {
          dataTestid: 'test-card',
        },
      });
      
      expect(wrapper.attributes('data-testid')).toBe('test-card');
    });

    it('should apply aria-label attribute', () => {
      const wrapper = mount(Card, {
        props: {
          ariaLabel: 'Weather information card',
        },
      });
      
      expect(wrapper.attributes('aria-label')).toBe('Weather information card');
    });

    it('should apply custom className', () => {
      const wrapper = mount(Card, {
        props: {
          className: 'custom-card-class',
        },
      });
      
      expect(wrapper.classes()).toContain('custom-card-class');
    });
  });

  describe('Combined Props', () => {
    it('should apply multiple props correctly', () => {
      const wrapper = mount(Card, {
        props: {
          id: 'weather-card',
          dataTestid: 'weather-card-test',
          ariaLabel: 'Current weather card',
          variant: 'elevated',
          size: 'lg',
          className: 'weather-card-custom',
        },
        slots: {
          default: '<p>Weather content</p>',
        },
      });
      
      expect(wrapper.attributes('id')).toBe('weather-card');
      expect(wrapper.attributes('data-testid')).toBe('weather-card-test');
      expect(wrapper.attributes('aria-label')).toBe('Current weather card');
      expect(wrapper.classes()).toContain('card--elevated');
      expect(wrapper.classes()).toContain('card--lg');
      expect(wrapper.classes()).toContain('weather-card-custom');
      expect(wrapper.text()).toBe('Weather content');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic article element', () => {
      const wrapper = mount(Card);
      
      expect(wrapper.element.tagName).toBe('ARTICLE');
    });

    it('should be accessible with aria-label', () => {
      const wrapper = mount(Card, {
        props: {
          ariaLabel: 'Weather forecast card',
        },
      });
      
      expect(wrapper.attributes('aria-label')).toBe('Weather forecast card');
    });
  });
});
