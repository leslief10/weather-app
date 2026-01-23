import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrentCard from '@/components/ui/Card/CurrentCard.vue';
import Card from '@/components/ui/Card/Card.vue';

describe('CurrentCard.vue', () => {
  describe('Rendering', () => {
    it('should render the Card component', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°F',
        },
      });

      expect(wrapper.findComponent(Card).exists()).toBe(true);
    });

    it('should render label text', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Feels Like',
          value: 68,
          unit: '°F',
        },
      });

      expect(wrapper.find('.current-card__label').text()).toBe('Feels Like');
    });

    it('should render value', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 75,
          unit: '°F',
        },
      });

      expect(wrapper.find('.current-card__value').text()).toBe('75');
    });

    it('should render unit', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 23,
          unit: '°C',
        },
      });

      expect(wrapper.find('.current-card__unit').text()).toBe('°C');
    });
  });

  describe('Card Props', () => {
    it('should pass variant="outlined" to Card component', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°F',
        },
      });

      const card = wrapper.findComponent(Card);
      expect(card.props('variant')).toBe('outlined');
    });

    it('should pass size="lg" to Card component', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°F',
        },
      });

      const card = wrapper.findComponent(Card);
      expect(card.props('size')).toBe('lg');
    });

    it('should apply current-card class to Card component', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°F',
        },
      });

      expect(wrapper.find('.current-card').exists()).toBe(true);
    });
  });

  describe('Layout Structure', () => {
    it('should render content container', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Humidity',
          value: 65,
          unit: '%',
        },
      });

      expect(wrapper.find('.current-card__content').exists()).toBe(true);
    });

    it('should render value container', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°F',
        },
      });

      expect(wrapper.find('.current-card__value-container').exists()).toBe(true);
    });
  });

  describe('Conditional Spacing', () => {
    it('should apply current-card__value-container--spacing class when unit length >= 2', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Wind Speed',
          value: 15,
          unit: 'mph',
        },
      });

      const container = wrapper.find('.current-card__value-container');
      expect(container.classes()).toContain('current-card__value-container--spacing');
    });

    it('should not apply current-card__value-container--spacing class when unit length < 2', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 72,
          unit: '°',
        },
      });

      const container = wrapper.find('.current-card__value-container');
      expect(container.classes()).not.toContain('current-card__value-container--spacing');
    });

    it('should not apply current-card__value-container--spacing class for single character unit', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Humidity',
          value: 65,
          unit: '%',
        },
      });

      const container = wrapper.find('.current-card__value-container');
      expect(container.classes()).not.toContain('current-card__value-container--spacing');
    });
  });

  describe('Different Data Types', () => {
    it('should render with numeric value as string', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: 0,
          unit: '°F',
        },
      });

      expect(wrapper.find('.current-card__value').text()).toBe('0');
    });

    it('should render with negative value', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Temperature',
          value: -5,
          unit: '°C',
        },
      });

      expect(wrapper.find('.current-card__value').text()).toBe('-5');
    });

    it('should render with long unit text', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Visibility',
          value: 10,
          unit: 'miles',
        },
      });

      expect(wrapper.find('.current-card__unit').text()).toBe('miles');
      const container = wrapper.find('.current-card__value-container');
      expect(container.classes()).toContain('current-card__value-container--spacing');
    });
  });

  describe('Complete Props Rendering', () => {
    it('should render all props correctly together', () => {
      const wrapper = mount(CurrentCard, {
        props: {
          label: 'Wind Speed',
          value: 12,
          unit: 'mph',
        },
      });

      expect(wrapper.find('.current-card__label').text()).toBe('Wind Speed');
      expect(wrapper.find('.current-card__value').text()).toBe('12');
      expect(wrapper.find('.current-card__unit').text()).toBe('mph');
    });
  });
});
