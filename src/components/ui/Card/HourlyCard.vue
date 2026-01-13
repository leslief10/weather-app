<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';
import type { HourlyCardProps } from '@/types';

defineProps<HourlyCardProps>();
</script>

<template>
  <Card
    variant="outlined"
    size="sm"
    class="hourly-card"
  >
    <div class="hourly-card-content">
      <div class="hourly-card-hour-container">
        <WeatherIcon
          :weather-code="weatherCode"
          size="sm"
        />
        <p class="hourly-card-hour">{{ hour }}</p>
      </div>
      <p class="hourly-card-temperature">{{ temperature }}°</p>
    </div>
  </Card>
</template>

<style scoped>
.hourly-card {
  padding: var(--spacing-0625) var(--spacing-1000) var(--spacing-0625)
    var(--spacing-0750);
}

.hourly-card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.hourly-card-hour-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-0500);
}

.hourly-card-hour {
  font-size: var(--spacing-1250);
  text-align: left;
  color: var(--neutral-0);
}

.hourly-card-temperature {
  font-size: var(--spacing-1000);
  text-align: center;
  color: var(--neutral-0);
}
</style>
