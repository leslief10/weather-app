<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/Input';
import { SearchDropdown } from '@/components/Search';
import { searchCities } from '@/services/locationService';
import { useWeatherStore } from '@/stores/weatherStore';
import type { LocationData } from '@/types';

const weatherStore = useWeatherStore();

const searchQuery = ref('');
const searchResults = ref<LocationData[]>([]);
const isLoading = ref(false);
const showSearchDropdown = ref(false);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const emit = defineEmits<{
  message: [message: string];
}>();

watch(searchQuery, (newQuery) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  if (newQuery.trim().length < 2) {
    searchResults.value = [];
    showSearchDropdown.value = false;
    return;
  }

  isLoading.value = true;
  showSearchDropdown.value = true;

  debounceTimeout = setTimeout(async () => {
    try {
      const results = await searchCities(newQuery);
      searchResults.value = results;
    } catch (error) {
      console.error('Search error:', error);
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  }, 300);
});

const handleSelectCity = async (city: LocationData) => {
  try {
    emit('message', '');
    showSearchDropdown.value = false;
    searchQuery.value = '';
    await weatherStore.fetchWeather(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const handleSearchButton = async () => {
  try {
    const result = searchResults?.value[0];

    if (result) {
      console.log('result', result);
      emit('message', '');
      await weatherStore.fetchWeather(result);
      showSearchDropdown.value = false;
      searchQuery.value = '';
    } else {
      emit('message', 'No search result found!');
    }
  } catch (error) {
    console.error('Error searching city:', error);
  }
};
</script>

<template>
  <div class="search">
    <div class="search-container">
      <SearchInput
        v-model="searchQuery"
        placeholder="Search for a place..."
        class="search-container__input"
      />
      <SearchDropdown
        v-if="showSearchDropdown"
        :results="searchResults"
        :is-loading="isLoading"
        @select="handleSelectCity"
      />
    </div>
    <Button
      :disabled="!searchResults"
      @click="handleSearchButton"
      >Search</Button
    >
  </div>
</template>

<style scoped>
.search {
  padding-top: var(--spacing-3000);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-0750);
  width: 100%;
  max-width: 41rem;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-container__input {
  width: 100%;
}

.search-container__input :deep(.search-input .input) {
  height: 3.5rem;
}

@media (min-width: 768px) {
  .search {
    flex-direction: row;
    gap: var(--spacing-1000);
  }
}

@media (min-width: 1024px) {
  .search {
    padding-top: var(--spacing-4000);
  }
}
</style>
