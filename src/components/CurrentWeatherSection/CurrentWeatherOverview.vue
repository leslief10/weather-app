<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { WeatherIcon } from '@/components/ui/Icons';
import { useWeatherStore } from '@/stores/weatherStore';
import { CurrentWeatherOverviewSkeleton } from '@/components/CurrentWeatherSection';

const weatherStore = useWeatherStore();
const { currentLocation, weatherData, loading } = storeToRefs(weatherStore);

const formatLocation = computed((): string => {
  if (!currentLocation) {
    return 'N/A';
  }

  return `${currentLocation?.value?.city}, ${currentLocation?.value?.country}`;
});

const formatDate = computed((): string => {
  if (!weatherData?.value?.current?.time) {
    return 'N/A';
  }

  const date = new Date(weatherData?.value?.current.time);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
});

const weatherCode = computed((): number => {
  if (!weatherData?.value?.current?.weatherCode) {
    return 0;
  }

  return weatherData.value?.current.weatherCode;
});

const formatTemperature = computed((): string => {
  if (!weatherData?.value?.current?.temperature) {
    return 'N/A';
  }

  return `${Math.round(weatherData?.value?.current.temperature)}°`;
});
</script>

<template>
  <CurrentWeatherOverviewSkeleton v-if="loading || !weatherData" />
  <div
    v-else
    class="current-weather"
  >
    <div class="current-weather__location">
      <p class="current-weather__city">{{ formatLocation }}</p>
      <time
        :datetime="weatherData?.current?.time"
        class="current-weather__date"
        >{{ formatDate }}</time
      >
    </div>
    <div class="current-weather__details">
      <WeatherIcon
        :weather-code="weatherCode"
        size="lg"
      />
      <h1 class="current-weather__temperature">{{ formatTemperature }}</h1>
    </div>
  </div>
</template>

<style scoped>
.current-weather {
  width: 100%;
  min-height: 17.87rem;
  padding: var(--spacing-2500) var(--spacing-1500);
  background: no-repeat center url('./../../assets/img/bg-today-large.svg');
  border-radius: var(--spacing-1250);
}

.current-weather__location {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-0750);
}

.current-weather__city {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 120%;
  color: var(--neutral-0);
}

.current-weather__date {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 120%;
  color: var(--neutral-200);
}

.current-weather__details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.current-weather__temperature {
  font-size: var(--spacing-6000);
  font-weight: 600;
  font-style: italic;
  line-height: 100%;
  letter-spacing: -2%;
  color: var(--neutral-0);
}

@media (min-width: 768px) {
  .current-weather {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-1500);
  }

  .current-weather__location {
    align-items: flex-start;
    justify-content: center;
  }

  .current-weather__details {
    gap: var(--spacing-1250);
  }
}
</style>
