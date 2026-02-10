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
    <div class="current-card__content">
      <p class="current-card__label">{{ label }}</p>
      <div
        class="current-card__value-container"
        :class="[
          unit.length >= 2 ? 'current-card__value-container--spacing' : '',
        ]"
      >
        <p class="current-card__value">{{ value }}</p>
        <p class="current-card__unit">{{ unit }}</p>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.current-card {
  width: 100%;
  padding: var(--spacing-1250);
}

.current-card__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-1500);
}

.current-card__label {
  font-size: var(--spacing-1125);
  font-weight: 500;
  text-align: left;
  color: var(--neutral-200);
}

.current-card__value-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.current-card__value-container--spacing {
  gap: var(--spacing-0500);
}

.current-card__value,
.current-card__unit {
  font-size: var(--spacing-2000);
  text-align: center;
  color: var(--neutral-0);
}

@media (min-width: 768px) {
  .current-card {
    max-width: 100%;
  }

  .current-card__content {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
