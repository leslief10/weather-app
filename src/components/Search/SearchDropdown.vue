<script setup lang="ts">
import { List, ListItem } from '@/components/ui/List';
import { SVGIcon } from '@/components/ui/Icons';
import type { LocationData } from '@/types';

defineProps<{
  results: LocationData[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  select: [city: LocationData];
}>();
</script>

<template>
  <div class="search-dropdown">
    <div
      v-if="isLoading"
      class="search-dropdown__loading"
    >
      <SVGIcon
        name="icon-loading"
        class="icon-loading"
      />
      Search in progress
    </div>
    <div
      v-else-if="!results"
      class="search-dropdown__empty"
    >
      No results found
    </div>
    <List
      v-else
      size="sm"
      class="search-dropdown__list"
    >
      <ListItem
        v-for="result in results"
        :key="`${result.latitude}-${result.longitude}`"
        interactive
        class="search-dropdown__item"
        @click="emit('select', result)"
      >
        {{ result.city }}, {{ result.country }}
      </ListItem>
    </List>
  </div>
</template>

<style scoped>
.search-dropdown {
  position: absolute;
  top: 4.125rem;
  width: 100%;
  padding: var(--spacing-0500);
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-700);
  border-radius: var(--spacing-0750);
  box-shadow: 0px 8px 16px 0px rgba(2, 1, 44, 0.32);
}

.search-dropdown__loading,
.search-dropdown__empty {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-0750);
  padding: var(--spacing-0625) var(--spacing-0500);
  color: var(--neutral-0);
}

.icon-loading {
  animation: spin 1s linear infinite;
}

.search-dropdown__list {
  gap: var(--spacing-0250);
}

.search-dropdown__item {
  padding: var(--spacing-0625) var(--spacing-0500);
  border-radius: var(--spacing-0500);
}

.search-dropdown__item:hover {
  border: 1px solid var(--neutral-600);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
