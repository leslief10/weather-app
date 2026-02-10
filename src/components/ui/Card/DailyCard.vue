<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/ui/Card/Card.vue';
import { WeatherIcon } from '@/components/ui/Icons';
import type { DailyCardProps } from '@/types';

const props = defineProps<DailyCardProps>();

const formatDay = computed((): string => {
  // API returns date-only strings (YYYY-MM-DD). Append noon time to avoid timezone issues.
  const dateString = `${props.date}T12:00:00`;
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
    <div class="daily-card__content">
      <time
        itemprop="day"
        :datetime="date"
        class="daily-card__date"
        >{{ formatDay }}</time
      >
      <WeatherIcon
        :weather-code="weatherCode"
        size="md"
      />
      <div class="daily-card__temperature-container">
        <p class="daily-card__temperature">{{ maxTemp }}°</p>
        <p class="daily-card__temperature">{{ minTemp }}°</p>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.daily-card {
  width: 100%;
  max-width: 6.5rem;
  padding: var(--spacing-1000) var(--spacing-0625);
}

.daily-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1000);
}

.daily-card__date {
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

.daily-card__temperature {
  font-size: var(--spacing-1000);
  text-align: center;
  color: var(--neutral-0);
}

@media (min-width: 768px) {
  .daily-card {
    flex: 1;
  }
}
</style>
