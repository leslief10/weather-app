<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';
import type { DailyCardProps } from '@/types';

const props = defineProps<DailyCardProps>();

const formatDay = computed((): string => {
  // API returns date-only strings (YYYY-MM-DD). Append noon time to avoid timezone issues.
  const dateString = `${props.time}T12:00:00`;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
  });
});
</script>

<template>
  <Card
    variant="outlined"
    size="md"
    class="daily-card"
  >
    <div class="daily-card-content">
      <time
        itemprop="day"
        :datetime="time"
        class="daily-card-time"
        >{{ formatDay }}</time
      >
      <WeatherIcon
        :weather-code="weatherCode"
        size="md"
      />
      <div class="daily-card-temperature-container">
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

.daily-card-temperature-container {
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
