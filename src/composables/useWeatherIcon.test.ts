import { describe, it, expect } from 'vitest';
import { useWeatherIcon } from './useWeatherIcon';

describe('useWeatherIcon', () => {
  describe('Clear/Sunny weather', () => {
    it('should return icon-sunny for weather code 0', () => {
      expect(useWeatherIcon(0)).toBe('icon-sunny');
    });
  });

  describe('Partly cloudy weather', () => {
    it('should return icon-partly-cloudy for weather code 1', () => {
      expect(useWeatherIcon(1)).toBe('icon-partly-cloudy');
    });

    it('should return icon-partly-cloudy for weather code 2', () => {
      expect(useWeatherIcon(2)).toBe('icon-partly-cloudy');
    });
  });

  describe('Overcast weather', () => {
    it('should return icon-overcast for weather code 3', () => {
      expect(useWeatherIcon(3)).toBe('icon-overcast');
    });
  });

  describe('Fog weather', () => {
    it('should return icon-fog for weather code 45', () => {
      expect(useWeatherIcon(45)).toBe('icon-fog');
    });

    it('should return icon-fog for weather code 48', () => {
      expect(useWeatherIcon(48)).toBe('icon-fog');
    });
  });

  describe('Drizzle weather', () => {
    it('should return icon-drizzle for weather codes 51, 53, 55, 56, 57', () => {
      expect(useWeatherIcon(51)).toBe('icon-drizzle');
      expect(useWeatherIcon(53)).toBe('icon-drizzle');
      expect(useWeatherIcon(55)).toBe('icon-drizzle');
      expect(useWeatherIcon(56)).toBe('icon-drizzle');
      expect(useWeatherIcon(57)).toBe('icon-drizzle');
    });
  });

  describe('Rain weather', () => {
    it('should return icon-rain for weather codes 61, 63, 65, 66, 67', () => {
      expect(useWeatherIcon(61)).toBe('icon-rain');
      expect(useWeatherIcon(63)).toBe('icon-rain');
      expect(useWeatherIcon(65)).toBe('icon-rain');
      expect(useWeatherIcon(66)).toBe('icon-rain');
      expect(useWeatherIcon(67)).toBe('icon-rain');
    });

    it('should return icon-rain for weather codes 80, 81, 82', () => {
      expect(useWeatherIcon(80)).toBe('icon-rain');
      expect(useWeatherIcon(81)).toBe('icon-rain');
      expect(useWeatherIcon(82)).toBe('icon-rain');
    });
  });

  describe('Snow weather', () => {
    it('should return icon-snow for weather codes 71, 73, 75, 77', () => {
      expect(useWeatherIcon(71)).toBe('icon-snow');
      expect(useWeatherIcon(73)).toBe('icon-snow');
      expect(useWeatherIcon(75)).toBe('icon-snow');
      expect(useWeatherIcon(77)).toBe('icon-snow');
    });

    it('should return icon-snow for weather codes 85, 86', () => {
      expect(useWeatherIcon(85)).toBe('icon-snow');
      expect(useWeatherIcon(86)).toBe('icon-snow');
    });
  });

  describe('Storm weather', () => {
    it('should return icon-storm for weather codes 95, 96, 99', () => {
      expect(useWeatherIcon(95)).toBe('icon-storm');
      expect(useWeatherIcon(96)).toBe('icon-storm');
      expect(useWeatherIcon(99)).toBe('icon-storm');
    });
  });

  describe('Default fallback', () => {
    it('should return icon-overcast for unknown weather code', () => {
      expect(useWeatherIcon(100)).toBe('icon-overcast');
    });

    it('should return icon-overcast for negative weather code', () => {
      expect(useWeatherIcon(-1)).toBe('icon-overcast');
    });

    it('should return icon-overcast for unmapped weather code', () => {
      expect(useWeatherIcon(50)).toBe('icon-overcast');
      expect(useWeatherIcon(70)).toBe('icon-overcast');
      expect(useWeatherIcon(1000)).toBe('icon-overcast');
    });
  });
});
