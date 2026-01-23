<script setup lang="ts">
import { CurrentCard } from '@/components/ui/Card';

const skeletonCards = [
  { label: 'Feels Like', value: '-', unit: '' },
  { label: 'Humidity', value: '-', unit: '' },
  { label: 'Wind', value: '-', unit: '' },
  { label: 'Precipitation', value: '-', unit: '' },
];
</script>

<template>
  <div class="current-weather-section__cards-skeleton">
    <CurrentCard
      v-for="card in skeletonCards"
      :key="card.label"
      :label="card.label"
      :value="card.value"
      :unit="card.unit"
    />
  </div>
</template>

<style scoped>
.current-weather-section__cards-skeleton {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-1000);
  width: 100%;
}

@media (min-width: 1024px) {
  .current-weather-section__cards-skeleton {
    gap: var(--spacing-1500);
  }
}
</style>
