<script setup lang="ts">
import {
  CurrentWeatherOverview,
  CurrentWeatherMetrics,
} from '@/components/CurrentWeatherSection';
</script>

<template>
  <section class="section current-weather-section">
    <CurrentWeatherOverview />
    <CurrentWeatherMetrics />
  </section>
</template>

<style scoped></style>
