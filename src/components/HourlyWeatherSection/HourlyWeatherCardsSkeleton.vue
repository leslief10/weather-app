<script setup lang="ts">
import { Card } from '@/components/ui/Card';
</script>

<template>
  <div class="hourly-weather-section__data-skeleton">
    <Card
      v-for="i in 24"
      :key="i"
      variant="outlined"
      size="sm"
      class="skeleton-card"
    />
  </div>
</template>

<style scoped>
.hourly-weather-section__data-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1000);
}

.skeleton-card {
  width: 100%;
  height: 3.75rem;
  padding: var(--spacing-0625) var(--spacing-1000) var(--spacing-0625)
    var(--spacing-0750);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
