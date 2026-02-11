import { ref } from 'vue';
import type { useUnitsStore } from '@/stores/unitsStore';
import type { TemperatureUnit, WindSpeedUnit, PrecipitationUnit } from '@/types';

type UnitsStoreReturn = ReturnType<typeof useUnitsStore>;

export interface MockUnitsStoreOptions {
  temperatureUnit?: TemperatureUnit;
  windSpeedUnit?: WindSpeedUnit;
  precipitationUnit?: PrecipitationUnit;
  isImperial?: boolean;
}

export function createMockUnitsStore(
  options: MockUnitsStoreOptions = {},
): UnitsStoreReturn {
  const temperatureUnit = options.temperatureUnit ?? 'celsius';
  const windSpeedUnit = options.windSpeedUnit ?? 'kmh';
  const precipitationUnit = options.precipitationUnit ?? 'mm';
  
  const isImperial = options.isImperial ?? (
    temperatureUnit === 'fahrenheit' &&
    windSpeedUnit === 'mph' &&
    precipitationUnit === 'inch'
  );

  return {
    temperatureUnit: ref(temperatureUnit),
    windSpeedUnit: ref(windSpeedUnit),
    precipitationUnit: ref(precipitationUnit),
    isImperial: ref(isImperial),
    switchToImperial: vi.fn(),
    switchToMetric: vi.fn(),
    $id: 'units',
    $state: {} as UnitsStoreReturn['$state'],
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(() => () => {}),
    $onAction: vi.fn(() => () => {}),
    $dispose: vi.fn(),
  } as unknown as UnitsStoreReturn;
}
