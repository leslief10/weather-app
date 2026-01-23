<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weatherStore';
import { DailyCard } from '@/components/ui/Card';
import { DailyWeatherCardsSkeleton } from '@/components/DailyWeatherSection';

const weatherStore = useWeatherStore();
const { dailyData, loading } = storeToRefs(weatherStore);
</script>

<template>
  <section class="daily-weather-section">
    <h2 class="daily-weather-section__title">Daily forecast</h2>
    <DailyWeatherCardsSkeleton v-if="loading" />
    <div
      v-else
      class="daily-weather-section__cards"
    >
      <DailyCard
        v-for="card in dailyData"
        :key="card.date"
        :date="card.date"
        :max-temp="card.maxTemp"
        :min-temp="card.minTemp"
        :weather-code="card.weatherCode"
      />
    </div>
  </section>
</template>

<style scoped>
.daily-weather-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1250);
  max-width: 50rem;
  width: 100%;
  padding-top: var(--spacing-2000);
}

.daily-weather-section__title {
  font-size: var(--spacing-1250);
  line-height: 120%;
  color: var(--neutral-0);
}

.daily-weather-section__cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-1000);
}
</style>
