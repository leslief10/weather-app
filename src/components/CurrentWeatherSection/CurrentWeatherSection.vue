<script setup lang="ts">
import {
  CurrentWeatherOverview,
  CurrentWeatherMetrics,
} from '@/components/CurrentWeatherSection';
</script>

<template>
  <section class="current-weather-section">
    <CurrentWeatherOverview />
    <CurrentWeatherMetrics />
  </section>
</template>

<style scoped>
.current-weather-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1250);
  max-width: 50rem;
  width: 100%;
  padding-top: var(--spacing-2000);
}
</style>
