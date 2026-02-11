import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUnitsStore } from './unitsStore';

describe('unitsStore', () => {
  let store: ReturnType<typeof useUnitsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUnitsStore();
  });

  describe('initial state', () => {
    it('should have metric units as default', () => {
      expect(store.temperatureUnit).toBe('celsius');
      expect(store.windSpeedUnit).toBe('kmh');
      expect(store.precipitationUnit).toBe('mm');
    });

    it('should not be imperial by default', () => {
      expect(store.isImperial).toBe(false);
    });
  });

  describe('isImperial', () => {
    it('should return false when all units are metric', () => {
      store.temperatureUnit = 'celsius';
      store.windSpeedUnit = 'kmh';
      store.precipitationUnit = 'mm';

      expect(store.isImperial).toBe(false);
    });

    it('should return true when all units are imperial', () => {
      store.temperatureUnit = 'fahrenheit';
      store.windSpeedUnit = 'mph';
      store.precipitationUnit = 'inch';

      expect(store.isImperial).toBe(true);
    });

    it('should return false when only temperature is imperial', () => {
      store.temperatureUnit = 'fahrenheit';
      store.windSpeedUnit = 'kmh';
      store.precipitationUnit = 'mm';

      expect(store.isImperial).toBe(false);
    });

    it('should return false when only windSpeed is imperial', () => {
      store.temperatureUnit = 'celsius';
      store.windSpeedUnit = 'mph';
      store.precipitationUnit = 'mm';

      expect(store.isImperial).toBe(false);
    });

    it('should return false when only precipitation is imperial', () => {
      store.temperatureUnit = 'celsius';
      store.windSpeedUnit = 'kmh';
      store.precipitationUnit = 'inch';

      expect(store.isImperial).toBe(false);
    });

    it('should return false when two units are imperial', () => {
      store.temperatureUnit = 'fahrenheit';
      store.windSpeedUnit = 'mph';
      store.precipitationUnit = 'mm';

      expect(store.isImperial).toBe(false);
    });

    it('should update reactively when units change', () => {
      expect(store.isImperial).toBe(false);

      store.temperatureUnit = 'fahrenheit';
      expect(store.isImperial).toBe(false);

      store.windSpeedUnit = 'mph';
      expect(store.isImperial).toBe(false);

      store.precipitationUnit = 'inch';
      expect(store.isImperial).toBe(true);
    });
  });

  describe('switchToImperial', () => {
    it('should set all units to imperial', () => {
      store.switchToImperial();

      expect(store.temperatureUnit).toBe('fahrenheit');
      expect(store.windSpeedUnit).toBe('mph');
      expect(store.precipitationUnit).toBe('inch');
    });

    it('should make isImperial return true', () => {
      store.switchToImperial();

      expect(store.isImperial).toBe(true);
    });

    it('should work when called from metric state', () => {
      expect(store.isImperial).toBe(false);

      store.switchToImperial();

      expect(store.isImperial).toBe(true);
    });
  });

  describe('switchToMetric', () => {
    it('should set all units to metric', () => {
      store.switchToMetric();

      expect(store.temperatureUnit).toBe('celsius');
      expect(store.windSpeedUnit).toBe('kmh');
      expect(store.precipitationUnit).toBe('mm');
    });

    it('should make isImperial return false', () => {
      store.switchToImperial();
      store.switchToMetric();

      expect(store.isImperial).toBe(false);
    });

    it('should work when called from imperial state', () => {
      store.switchToImperial();
      expect(store.isImperial).toBe(true);

      store.switchToMetric();

      expect(store.isImperial).toBe(false);
    });
  });

  describe('unit switching', () => {
    it('should toggle between metric and imperial', () => {
      expect(store.isImperial).toBe(false);

      store.switchToImperial();
      expect(store.isImperial).toBe(true);

      store.switchToMetric();
      expect(store.isImperial).toBe(false);
    });

    it('should handle multiple consecutive switches', () => {
      store.switchToImperial();
      store.switchToImperial();

      expect(store.isImperial).toBe(true);

      store.switchToMetric();
      store.switchToMetric();

      expect(store.isImperial).toBe(false);
    });
  });
});
