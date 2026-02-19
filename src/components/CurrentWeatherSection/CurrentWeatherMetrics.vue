<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { CurrentCard } from '@/components/ui/Card';
import { CurrentWeatherMetricsSkeleton } from '@/components/CurrentWeatherSection';
import { useWeatherStore } from '@/stores/weatherStore';
import type { CurrentCardProps } from '@/types';

const weatherStore = useWeatherStore();
const { weatherData, loading } = storeToRefs(weatherStore);

const formatCardValue = (value: number | undefined): string | number => {
  if (value === undefined || value === null) {
    return '-';
  }
  return Math.round(value);
};

const temperatureUnit = (): string => {
  const temp = weatherData?.value?.current.apparentTemperature;
  if (temp !== null && temp !== undefined) {
    return '°';
  }
  return '';
};

const humidityUnit = (): string => {
  const humidity = weatherData?.value?.current.relativeHumidity;
  if (humidity !== null && humidity !== undefined) {
    return '%';
  }
  return '';
};

const windSpeedUnit = (): string => {
  const windSpeed = weatherData?.value?.current.windSpeedUnit;
  if (windSpeed === 'km/h') {
    return 'km/h';
  } else if (windSpeed === 'mp/h') {
    return 'mph';
  }
  return '';
};

const precipitationUnit = (): string => {
  const precipitation = weatherData?.value?.current.precipitationUnit;
  if (precipitation === 'mm') {
    return 'mm';
  } else if (precipitation === 'inch') {
    return 'in';
  }
  return '';
};

const weatherCards = computed((): CurrentCardProps[] => {
  if (!weatherData?.value?.current) {
    return [];
  }

  return [
    {
      label: 'Feels Like',
      value: formatCardValue(weatherData?.value?.current.apparentTemperature),
      unit: temperatureUnit(),
    },
    {
      label: 'Humidity',
      value: formatCardValue(weatherData?.value?.current.relativeHumidity),
      unit: humidityUnit(),
    },
    {
      label: 'Wind',
      value: formatCardValue(weatherData?.value?.current.windSpeed),
      unit: windSpeedUnit(),
    },
    {
      label: 'Precipitation',
      value: formatCardValue(weatherData?.value?.current.precipitation),
      unit: precipitationUnit(),
    },
  ];
});
</script>

<template>
  <CurrentWeatherMetricsSkeleton v-if="loading || !weatherData" />
  <div
    v-else
    class="current-weather-section__metrics"
  >
    <CurrentCard
      v-for="card in weatherCards"
      :key="card.label"
      :label="card.label"
      :value="card.value"
      :unit="card.unit"
    />
  </div>
</template>

<style scoped>
.current-weather-section__metrics {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-1000);
  width: 100%;
}

@media (min-width: 768px) {
  .current-weather-section__metrics {
    flex-wrap: nowrap;
  }
}

@media (min-width: 1024px) {
  .current-weather-section__metrics {
    gap: var(--spacing-1500);
  }
}
</style>
