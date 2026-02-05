import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from '@/types';

export const useUnitsStore = defineStore('units', () => {
  const temperatureUnit = ref<TemperatureUnit>('celsius');
  const windSpeedUnit = ref<WindSpeedUnit>('kmh');
  const precipitationUnit = ref<PrecipitationUnit>('mm');

  const isImperial = computed(
    () =>
      temperatureUnit.value === 'fahrenheit' &&
      windSpeedUnit.value === 'mph' &&
      precipitationUnit.value === 'inch',
  );

  const switchToImperial = () => {
    temperatureUnit.value = 'fahrenheit';
    windSpeedUnit.value = 'mph';
    precipitationUnit.value = 'inch';
  };

  const switchToMetric = () => {
    temperatureUnit.value = 'celsius';
    windSpeedUnit.value = 'kmh';
    precipitationUnit.value = 'mm';
  };

  return {
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,
    isImperial,
    switchToImperial,
    switchToMetric,
  };
});
