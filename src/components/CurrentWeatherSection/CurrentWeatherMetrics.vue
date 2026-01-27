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

const weatherCards = computed((): CurrentCardProps[] => {
  if (!weatherData?.value?.current) {
    return [];
  }

  return [
    {
      label: 'Feels Like',
      value: formatCardValue(weatherData?.value?.current.apparentTemperature),
      unit: weatherData?.value?.current.apparentTemperature != null ? '°' : '',
    },
    {
      label: 'Humidity',
      value: formatCardValue(weatherData?.value?.current.relativeHumidity),
      unit: weatherData?.value?.current.relativeHumidity != null ? '%' : '',
    },
    {
      label: 'Wind',
      value: formatCardValue(weatherData?.value?.current.windSpeed),
      unit: weatherData?.value?.current.windSpeedUnit ?? '',
    },
    {
      label: 'Precipitation',
      value: formatCardValue(weatherData?.value?.current.precipitation),
      unit: weatherData?.value?.current.precipitationUnit ?? '',
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
