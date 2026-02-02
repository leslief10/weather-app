<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weatherStore';
import { IconButton } from '@/components/ui/Button';
import { SVGIcon } from '@/components/ui/Icons';
import { HourlyCard } from '@/components/ui/Card';
import {
  HourlyDropdown,
  HourlyWeatherCardsSkeleton,
} from '@/components/HourlyWeatherSection';

const weatherStore = useWeatherStore();
const { weatherData, hourlyData, formattedDays, loading } =
  storeToRefs(weatherStore);

const selectedDay = ref('');
const isHourlyDropdownVisible = ref(false);

const toggleHourlyDropdown = (): void => {
  isHourlyDropdownVisible.value = !isHourlyDropdownVisible.value;
};

const initializeSelectedDay = (): void => {
  if (weatherData?.value?.current?.time) {
    const date = new Date(weatherData.value.current.time);
    selectedDay.value = date.toLocaleDateString('en-US', { weekday: 'long' });
  }
};

const handleDaySelect = (day: string): void => {
  selectedDay.value = day;
  isHourlyDropdownVisible.value = false;
};

watch(
  [weatherData, loading],
  () => {
    if (loading.value || !weatherData.value) {
      selectedDay.value = '-';
      return;
    }

    if (!selectedDay.value || selectedDay.value === '-') {
      initializeSelectedDay();
    }
  },
  { immediate: true },
);

const filteredHourlyData = computed(() => {
  if (!hourlyData?.value?.length || !weatherData.value?.daily?.time) {
    return [];
  }

  const dayIndex = formattedDays.value.findIndex(
    (day) => day === selectedDay.value,
  );

  if (dayIndex === -1) return [];

  const targetDate = weatherData.value.daily.time[dayIndex];

  return hourlyData.value.filter((item) => {
    const itemDate = item.hour.split('T')[0];
    return itemDate === targetDate;
  });
});
</script>

<template>
  <section class="section hourly-weather-section">
    <div class="hourly-weather-section__header">
      <h2 class="hourly-weather-section__title">Hourly forecast</h2>
      <IconButton
        variant="tertiary"
        size="md"
        :disabled="loading || !weatherData"
        @click="toggleHourlyDropdown"
        >{{ selectedDay }}
        <SVGIcon name="icon-dropdown" />
      </IconButton>
      <HourlyDropdown
        v-show="isHourlyDropdownVisible"
        @select-day="handleDaySelect"
      />
    </div>
    <HourlyWeatherCardsSkeleton v-if="loading || !hourlyData" />
    <div
      v-else
      class="hourly-weather-section__data"
    >
      <HourlyCard
        v-for="card in filteredHourlyData"
        :key="card.hour"
        :hour="card.hour"
        :temperature="card.temperature"
        :weather-code="card.weatherCode"
        class="hourly-weather-section__card"
      />
    </div>
  </section>
</template>

<style scoped>
.hourly-weather-section {
  gap: var(--spacing-1000);
  height: 42.8125rem;
  padding: var(--spacing-1250) var(--spacing-1000);
  margin-top: var(--spacing-2000);
  border-radius: var(--spacing-1250);
  background-color: var(--neutral-800);
  overflow-y: scroll;
}

.hourly-weather-section:focus-visible {
  outline: var(--spacing-0125) solid var(--neutral-0);
  outline-offset: var(--spacing-0125);
}

.hourly-weather-section__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.hourly-weather-section__title {
  font-size: var(--spacing-1250);
  line-height: 120%;
  color: var(--neutral-0);
}

.hourly-weather-section__card:not(:last-of-type) {
  margin-bottom: var(--spacing-1000);
}

@media (min-width: 768px) {
  .hourly-weather-section {
    padding: var(--spacing-1500);
    height: 43.3125rem;
  }
}

@media (min-width: 1280px) {
  .hourly-weather-section {
    margin-top: 0;
  }
}
</style>
