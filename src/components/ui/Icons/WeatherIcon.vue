<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherIcon } from '@/composables/useWeatherIcon';
import { useWeatherIconAlt } from '@/composables/useWeatherIconAlt';

interface Props {
  weatherCode: number;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const iconName = computed(() => useWeatherIcon(props.weatherCode));

const altLabel = computed(() => useWeatherIconAlt(props.weatherCode));

const iconPath = computed(() => `/src/assets/img/${iconName.value}.webp`);

const sizeClass = computed(() => `weather-icon--${props.size}`);
</script>

<template>
  <img
    :src="iconPath"
    :alt="altLabel"
    :class="['weather-icon', sizeClass]"
  />
</template>

<style scoped>
.weather-icon {
  display: block;
  object-fit: contain;
}

.weather-icon--sm {
  width: var(--spacing-2500);
  height: var(--spacing-2500);
}

.weather-icon--md {
  width: var(--spacing-3750);
  height: var(--spacing-3750);
}

.weather-icon--lg {
  width: var(--spacing-7500);
  height: var(--spacing-7500);
}
</style>
