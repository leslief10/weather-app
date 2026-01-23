<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';
import type { HourlyCardProps } from '@/types';

const props = defineProps<HourlyCardProps>();

const formatHour = computed((): string => {
  const date = new Date(props.hour);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
});
</script>

<template>
  <Card
    variant="outlined"
    size="sm"
    class="hourly-card"
  >
    <div class="hourly-card__content">
      <div class="hourly-card__hour-container">
        <WeatherIcon
          :weather-code="weatherCode"
          size="sm"
        />
        <time
          itemprop="hour"
          :datetime="hour"
          class="hourly-card__hour"
          >{{ formatHour }}</time
        >
      </div>
      <p class="hourly-card__temperature">{{ temperature }}°</p>
    </div>
  </Card>
</template>

<style scoped>
.hourly-card {
  padding: var(--spacing-0625) var(--spacing-1000) var(--spacing-0625)
    var(--spacing-0750);
}

.hourly-card__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.hourly-card__hour-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-0500);
}

.hourly-card__hour {
  font-size: var(--spacing-1250);
  text-align: left;
  color: var(--neutral-0);
}

.hourly-card__temperature {
  font-size: var(--spacing-1000);
  text-align: center;
  color: var(--neutral-0);
}
</style>
