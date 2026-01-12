<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';
import type { DailyCardProps } from '@/types';

defineProps<DailyCardProps>();
</script>

<template>
  <Card
    variant="outlined"
    size="md"
    class="daily-card"
  >
    <div class="daily-card-content">
      <p class="daily-card-time">{{ time }}</p>
      <WeatherIcon
        :weather-code="weatherCode"
        size="md"
      />
      <div class="daily-card__temperature-container">
        <p class="daily-card-temperature">{{ maxTemp }}°</p>
        <p class="daily-card-temperature">{{ minTemp }}°</p>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.daily-card {
  min-width: 5.625rem;
  max-width: 6.5rem;
  padding: var(--spacing-1000) var(--spacing-0625);
}

.daily-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1000);
}

.daily-card-time {
  font-size: var(--spacing-1125);
  text-align: center;
  color: var(--neutral-0);
}

.daily-card__temperature-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.daily-card-temperature {
  font-size: var(--spacing-1000);
  text-align: center;
  color: var(--neutral-0);
}
</style>
