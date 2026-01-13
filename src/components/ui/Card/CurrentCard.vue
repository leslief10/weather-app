<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import type { CurrentCardProps } from '@/types';

defineProps<CurrentCardProps>();
</script>

<template>
  <Card
    variant="outlined"
    size="lg"
    class="current-card"
  >
    <div class="current-card-content">
      <p class="current-card-label">{{ label }}</p>
      <div
        class="current-card-value-container"
        :class="[unit.length > 2 ? 'container--spacing' : '']"
      >
        <p class="current-card-value">{{ value }}</p>
        <p class="current-card-unit">{{ unit }}</p>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.current-card {
  max-width: 10.25rem;
  padding: var(--spacing-1250);
}

.current-card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1500);
}

.current-card-label {
  font-size: var(--spacing-1125);
  font-weight: 500;
  text-align: left;
  color: var(--neutral-200);
}

.current-card-value-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.container--spacing {
  gap: var(--spacing-0500);
}

.current-card-value,
.current-card-unit {
  font-size: var(--spacing-2000);
  text-align: center;
  color: var(--neutral-0);
}
</style>
