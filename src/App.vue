<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserLocation } from './services/locationService';
import type { LocationData } from './types/types';

const location = ref<LocationData | null>(null);

async function loadLocationData() {
  try {
    const locationData = await getUserLocation();
    location.value = locationData;
    console.log(location.value);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  loadLocationData();
});
</script>

<template>
  <div>Hi again</div>
</template>

<style scoped></style>
