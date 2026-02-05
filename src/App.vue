<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Layout/Header.vue';
import Main from './components/Layout/Main.vue';
import { useWeatherStore } from '@/stores/weatherStore';
import { getUserLocation } from '@/services/locationService';

const weatherStore = useWeatherStore();

async function initializeData() {
  try {
    const location = await getUserLocation();
    await weatherStore.fetchWeather(location);
  } catch (error) {
    console.error('Failed to initialize weather data:', error);
  }
}

onMounted(initializeData);
</script>

<template>
  <Header />
  <Main />
</template>

<style scoped></style>
