import { describe, it, expect } from 'vitest';
import { useWeatherIconAlt } from './useWeatherIconAlt';

describe('useWeatherIconAlt', () => {
  describe('Clear/Sunny weather', () => {
    it('should return Clear sky for weather code 0', () => {
      expect(useWeatherIconAlt(0)).toBe('Clear sky');
    });
  });

  describe('Partly cloudy weather', () => {
    it('should return Mainly clear for weather code 1', () => {
      expect(useWeatherIconAlt(1)).toBe('Mainly clear');
    });

    it('should return Partly cloudy for weather code 2', () => {
      expect(useWeatherIconAlt(2)).toBe('Partly cloudy');
    });
  });

  describe('Overcast weather', () => {
    it('should return Overcast for weather code 3', () => {
      expect(useWeatherIconAlt(3)).toBe('Overcast');
    });
  });

  describe('Fog weather', () => {
    it('should return Foggy conditions for weather code 45', () => {
      expect(useWeatherIconAlt(45)).toBe('Foggy conditions');
    });

    it('should return Depositing rime fog for weather code 48', () => {
      expect(useWeatherIconAlt(48)).toBe('Depositing rime fog');
    });
  });

  describe('Drizzle weather', () => {
    it('should return Light drizzle for weather codes 51', () => {
      expect(useWeatherIconAlt(51)).toBe('Light drizzle');
    });

    it('should return Moderate drizzle for weather codes 53', () => {
      expect(useWeatherIconAlt(53)).toBe('Moderate drizzle');
    });

    it('should return Dense drizzle for weather codes 55', () => {
      expect(useWeatherIconAlt(55)).toBe('Dense drizzle');
    });

    it('should return Light freezing drizzle for weather codes 56', () => {
      expect(useWeatherIconAlt(56)).toBe('Light freezing drizzle');
    });

    it('should return Dense freezing drizzle for weather codes 57', () => {
      expect(useWeatherIconAlt(57)).toBe('Dense freezing drizzle');
    });
  });

  describe('Rain weather', () => {
    it('should return Slight rain for weather codes 61', () => {
      expect(useWeatherIconAlt(61)).toBe('Slight rain');
    });

    it('should return Moderate rain for weather codes 63', () => {
      expect(useWeatherIconAlt(63)).toBe('Moderate rain');
    });

    it('should return Heavy rain for weather codes 65', () => {
      expect(useWeatherIconAlt(65)).toBe('Heavy rain');
    });

    it('should return Light freezing rain for weather codes 66', () => {
      expect(useWeatherIconAlt(66)).toBe('Light freezing rain');
    });

    it('should return Heavy freezing rain for weather codes 67', () => {
      expect(useWeatherIconAlt(67)).toBe('Heavy freezing rain');
    });

    it('should return Slight rain showers for weather codes 80', () => {
      expect(useWeatherIconAlt(80)).toBe('Slight rain showers');
    });

    it('should return Moderate rain showers for weather codes 81', () => {
      expect(useWeatherIconAlt(81)).toBe('Moderate rain showers');
    });

    it('should return Violent rain showers for weather codes 82', () => {
      expect(useWeatherIconAlt(82)).toBe('Violent rain showers');
    });
  });

  describe('Snow weather', () => {
    it('should return Slight snow fall for weather codes 71', () => {
      expect(useWeatherIconAlt(71)).toBe('Slight snow fall');
    });

    it('should return Moderate snow fall for weather codes 73', () => {
      expect(useWeatherIconAlt(73)).toBe('Moderate snow fall');
    });

    it('should return Heavy snow fall for weather codes 75', () => {
      expect(useWeatherIconAlt(75)).toBe('Heavy snow fall');
    });

    it('should return Snow grains for weather codes 77', () => {
      expect(useWeatherIconAlt(77)).toBe('Snow grains');
    });

    it('should return Slight snow showers for weather codes 85', () => {
      expect(useWeatherIconAlt(85)).toBe('Slight snow showers');
    });

    it('should return Heavy snow showers for weather codes 86', () => {
      expect(useWeatherIconAlt(86)).toBe('Heavy snow showers');
    });
  });

  describe('Storm weather', () => {
    it('should return Thunderstorm for weather codes 95', () => {
      expect(useWeatherIconAlt(95)).toBe('Thunderstorm');
    });

    it('should return Thunderstorm with slight hail for weather codes 96', () => {
      expect(useWeatherIconAlt(96)).toBe('Thunderstorm with slight hail');
    });

    it('should return Thunderstorm with heavy hail for weather codes 99', () => {
      expect(useWeatherIconAlt(99)).toBe('Thunderstorm with heavy hail');
    });
  });

  describe('Default fallback', () => {
    it('should return Overcast for unknown weather code', () => {
      expect(useWeatherIconAlt(100)).toBe('Overcast');
    });

    it('should return Overcast for negative weather code', () => {
      expect(useWeatherIconAlt(-1)).toBe('Overcast');
    });

    it('should return Overcast for unmapped weather code', () => {
      expect(useWeatherIconAlt(50)).toBe('Overcast');
      expect(useWeatherIconAlt(70)).toBe('Overcast');
      expect(useWeatherIconAlt(1000)).toBe('Overcast');
    });
  });
});
