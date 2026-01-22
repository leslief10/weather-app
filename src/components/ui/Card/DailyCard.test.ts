import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DailyCard from '@/components/ui/Card/DailyCard.vue';
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';

describe('DailyCard.vue', () => {
  describe('Rendering', () => {
    it('should render the Card component', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-19',
          weatherCode: 0,
          maxTemp: 75,
          minTemp: 60,
        },
      });

      expect(wrapper.findComponent(Card).exists()).toBe(true);
    });

    it('should render date text', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-16',
          weatherCode: 1,
          maxTemp: 72,
          minTemp: 58,
        },
      });

      expect(wrapper.find('.daily-card-date').text()).toBe('Fri');
    });

    it('should render WeatherIcon component', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-14',
          weatherCode: 2,
          maxTemp: 68,
          minTemp: 55,
        },
      });

      expect(wrapper.findComponent(WeatherIcon).exists()).toBe(true);
    });

    it('should render max temperature with degree symbol', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-15',
          weatherCode: 3,
          maxTemp: 80,
          minTemp: 65,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('80°');
    });

    it('should render min temperature with degree symbol', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-16',
          weatherCode: 45,
          maxTemp: 77,
          minTemp: 62,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[1]?.text()).toBe('62°');
    });
  });

  describe('Card Props', () => {
    it('should pass variant="outlined" to Card component', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-17',
          weatherCode: 61,
          maxTemp: 70,
          minTemp: 55,
        },
      });

      const card = wrapper.findComponent(Card);
      expect(card.props('variant')).toBe('outlined');
    });

    it('should pass size="md" to Card component', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-18',
          weatherCode: 80,
          maxTemp: 73,
          minTemp: 59,
        },
      });

      const card = wrapper.findComponent(Card);
      expect(card.props('size')).toBe('md');
    });

    it('should apply daily-card class to Card component', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-19',
          weatherCode: 95,
          maxTemp: 68,
          minTemp: 54,
        },
      });

      expect(wrapper.find('.daily-card').exists()).toBe(true);
    });
  });

  describe('WeatherIcon Props', () => {
    it('should pass weatherCode prop to WeatherIcon', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-20',
          weatherCode: 51,
          maxTemp: 66,
          minTemp: 52,
        },
      });

      const weatherIcon = wrapper.findComponent(WeatherIcon);
      expect(weatherIcon.props('weatherCode')).toBe(51);
    });

    it('should pass size="md" to WeatherIcon', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-21',
          weatherCode: 71,
          maxTemp: 65,
          minTemp: 50,
        },
      });

      const weatherIcon = wrapper.findComponent(WeatherIcon);
      expect(weatherIcon.props('size')).toBe('md');
    });

    it('should render WeatherIcon with different weather codes', () => {
      const weatherCodes = [0, 1, 2, 3, 45, 48, 51, 61, 71, 80, 95];

      weatherCodes.forEach((code) => {
        const wrapper = mount(DailyCard, {
          props: {
            date: '2026-01-15',
            weatherCode: code,
            maxTemp: 70,
            minTemp: 55,
          },
        });

        const weatherIcon = wrapper.findComponent(WeatherIcon);
        expect(weatherIcon.props('weatherCode')).toBe(code);
      });
    });
  });

  describe('Layout Structure', () => {
    it('should render content container', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-16',
          weatherCode: 0,
          maxTemp: 75,
          minTemp: 60,
        },
      });

      expect(wrapper.find('.daily-card-content').exists()).toBe(true);
    });

    it('should render temperature container', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-17',
          weatherCode: 1,
          maxTemp: 72,
          minTemp: 58,
        },
      });

      expect(wrapper.find('.daily-card-temperature-container').exists()).toBe(
        true,
      );
    });

    it('should render both temperatures in temperature container', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-18',
          weatherCode: 2,
          maxTemp: 78,
          minTemp: 63,
        },
      });

      const tempContainer = wrapper.find('.daily-card-temperature-container');
      const temps = tempContainer.findAll('.daily-card-temperature');
      expect(temps).toHaveLength(2);
    });
  });

  describe('Temperature Display', () => {
    it('should display max temperature before min temperature', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-19',
          weatherCode: 3,
          maxTemp: 85,
          minTemp: 70,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('85°');
      expect(temps[1]?.text()).toBe('70°');
    });

    it('should handle negative temperatures', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-20',
          weatherCode: 71,
          maxTemp: 5,
          minTemp: -10,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('5°');
      expect(temps[1]?.text()).toBe('-10°');
    });

    it('should handle zero temperatures', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-14',
          weatherCode: 61,
          maxTemp: 0,
          minTemp: 0,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('0°');
      expect(temps[1]?.text()).toBe('0°');
    });

    it('should handle three-digit temperatures', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-15',
          weatherCode: 0,
          maxTemp: 105,
          minTemp: 85,
        },
      });

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('105°');
      expect(temps[1]?.text()).toBe('85°');
    });
  });

  describe('Complete Props Rendering', () => {
    it('should render all props correctly together', () => {
      const wrapper = mount(DailyCard, {
        props: {
          date: '2026-01-16',
          weatherCode: 61,
          maxTemp: 82,
          minTemp: 67,
        },
      });

      expect(wrapper.find('.daily-card-date').text()).toBe('Fri');
      expect(wrapper.findComponent(WeatherIcon).props('weatherCode')).toBe(61);

      const temps = wrapper.findAll('.daily-card-temperature');
      expect(temps[0]?.text()).toBe('82°');
      expect(temps[1]?.text()).toBe('67°');
    });
  });
});
