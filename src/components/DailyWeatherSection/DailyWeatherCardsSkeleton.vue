<script setup lang="ts">
import { Card } from '@/components/ui/Card';
</script>

<template>
  <div class="daily-weather-section__cards-skeleton">
    <Card
      v-for="i in 7"
      :key="i"
      variant="outlined"
      size="md"
      class="skeleton-card"
    />
  </div>
</template>

<style scoped>
.daily-weather-section__cards-skeleton {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-1000) 0.875rem;
}

.skeleton-card {
  width: 100%;
  max-width: 6.5rem;
  height: 10.3125rem;
  padding: var(--spacing-1000) var(--spacing-0625);
}

@media (min-width: 768px) {
  .daily-weather-section__cards-skeleton {
    gap: var(--spacing-1000);
  }

  .skeleton-card {
    flex: 1;
  }
}
</style>
