<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weatherStore';
import { List, ListItem } from '@/components/ui/List';

const weatherStore = useWeatherStore();
const { formattedDays } = storeToRefs(weatherStore);

const emit = defineEmits<{
  selectDay: [day: string];
}>();
</script>

<template>
  <div class="hourly-dropdown">
    <List
      size="sm"
      class="hourly-dropdown__list"
    >
      <ListItem
        v-for="day in formattedDays"
        :key="day"
        interactive
        class="hourly-dropdown__item"
        @click="emit('selectDay', day)"
      >
        {{ day }}
      </ListItem>
    </List>
  </div>
</template>

<style scoped>
.hourly-dropdown {
  position: absolute;
  right: 0;
  top: 3.3125rem;
  width: 13.375rem;
  padding: var(--spacing-0500);
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-600);
  border-radius: var(--spacing-0750);
  box-shadow: 0px 8px 16px 0px rgba(2, 1, 44, 0.32);
}

.hourly-dropdown__list {
  gap: var(--spacing-0250);
}

.hourly-dropdown__item {
  padding: var(--spacing-0625) var(--spacing-0500);
  border-radius: var(--spacing-0500);
}
</style>
