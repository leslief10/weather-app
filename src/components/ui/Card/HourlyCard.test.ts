import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HourlyCard from '@/components/ui/Card/HourlyCard.vue';
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';

describe('HourlyCard.vue', () => {
  describe('Rendering', () => {
    it('should render the Card component', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '12 PM',
          weatherCode: 0,
          temperature: 72,
        },
      });
      
      expect(wrapper.findComponent(Card).exists()).toBe(true);
    });

    it('should render hour text', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '3 PM',
          weatherCode: 1,
          temperature: 75,
        },
      });
      
      expect(wrapper.find('.hourly-card-hour').text()).toBe('3 PM');
    });

    it('should render WeatherIcon component', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '6 PM',
          weatherCode: 2,
          temperature: 68,
        },
      });
      
      expect(wrapper.findComponent(WeatherIcon).exists()).toBe(true);
    });

    it('should render temperature with degree symbol', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '9 PM',
          weatherCode: 3,
          temperature: 65,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('65°');
    });
  });

  describe('Card Props', () => {
    it('should pass variant="outlined" to Card component', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '12 AM',
          weatherCode: 45,
          temperature: 58,
        },
      });
      
      const card = wrapper.findComponent(Card);
      expect(card.props('variant')).toBe('outlined');
    });

    it('should pass size="sm" to Card component', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '3 AM',
          weatherCode: 48,
          temperature: 55,
        },
      });
      
      const card = wrapper.findComponent(Card);
      expect(card.props('size')).toBe('sm');
    });

    it('should apply hourly-card class to Card component', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '6 AM',
          weatherCode: 51,
          temperature: 52,
        },
      });
      
      expect(wrapper.find('.hourly-card').exists()).toBe(true);
    });
  });

  describe('WeatherIcon Props', () => {
    it('should pass weatherCode prop to WeatherIcon', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '9 AM',
          weatherCode: 61,
          temperature: 60,
        },
      });
      
      const weatherIcon = wrapper.findComponent(WeatherIcon);
      expect(weatherIcon.props('weatherCode')).toBe(61);
    });

    it('should pass size="sm" to WeatherIcon', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '12 PM',
          weatherCode: 71,
          temperature: 70,
        },
      });
      
      const weatherIcon = wrapper.findComponent(WeatherIcon);
      expect(weatherIcon.props('size')).toBe('sm');
    });

    it('should render WeatherIcon with different weather codes', () => {
      const weatherCodes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82, 85, 86, 95, 96, 99];
      
      weatherCodes.forEach((code) => {
        const wrapper = mount(HourlyCard, {
          props: {
            hour: '1 PM',
            weatherCode: code,
            temperature: 72,
          },
        });
        
        const weatherIcon = wrapper.findComponent(WeatherIcon);
        expect(weatherIcon.props('weatherCode')).toBe(code);
      });
    });
  });

  describe('Layout Structure', () => {
    it('should render content container', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '2 PM',
          weatherCode: 0,
          temperature: 73,
        },
      });
      
      expect(wrapper.find('.hourly-card-content').exists()).toBe(true);
    });

    it('should render hour container', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '4 PM',
          weatherCode: 1,
          temperature: 74,
        },
      });
      
      expect(wrapper.find('.hourly-card-hour-container').exists()).toBe(true);
    });

    it('should render WeatherIcon and hour in the same container', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '5 PM',
          weatherCode: 2,
          temperature: 76,
        },
      });
      
      const hourContainer = wrapper.find('.hourly-card-hour-container');
      expect(hourContainer.findComponent(WeatherIcon).exists()).toBe(true);
      expect(hourContainer.find('.hourly-card-hour').exists()).toBe(true);
    });
  });

  describe('Temperature Display', () => {
    it('should handle positive temperatures', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '1 PM',
          weatherCode: 0,
          temperature: 85,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('85°');
    });

    it('should handle negative temperatures', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '2 AM',
          weatherCode: 71,
          temperature: -5,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('-5°');
    });

    it('should handle zero temperature', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '3 AM',
          weatherCode: 61,
          temperature: 0,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('0°');
    });

    it('should handle three-digit temperatures', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '2 PM',
          weatherCode: 0,
          temperature: 105,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('105°');
    });

    it('should handle single-digit temperatures', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '5 AM',
          weatherCode: 2,
          temperature: 8,
        },
      });
      
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('8°');
    });
  });

  describe('Component Layout Order', () => {
    it('should render WeatherIcon before hour text', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '7 PM',
          weatherCode: 45,
          temperature: 70,
        },
      });
      
      const hourContainer = wrapper.find('.hourly-card-hour-container');
      const children = hourContainer.element.children;
      
      console.log('hourContainer', children[0]);
      expect(children[0]?.className).toContain('weather-icon');
      expect(children[1]?.className).toContain('hourly-card-hour');
    });

    it('should render hour container before temperature', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '10 AM',
          weatherCode: 51,
          temperature: 68,
        },
      });
      
      const content = wrapper.find('.hourly-card-content');
      const children = content.element.children;
      
      expect(children[0]?.className).toContain('hourly-card-hour-container');
      expect(children[1]?.className).toContain('hourly-card-temperature');
    });
  });

  describe('Complete Props Rendering', () => {
    it('should render all props correctly together', () => {
      const wrapper = mount(HourlyCard, {
        props: {
          hour: '4 PM',
          weatherCode: 80,
          temperature: 82,
        },
      });
      
      expect(wrapper.find('.hourly-card-hour').text()).toBe('4 PM');
      expect(wrapper.findComponent(WeatherIcon).props('weatherCode')).toBe(80);
      expect(wrapper.find('.hourly-card-temperature').text()).toBe('82°');
    });
  });
});
