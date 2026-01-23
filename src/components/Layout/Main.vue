<script setup lang="ts">
import Search from '@/components/Search/Search.vue';
import { CurrentWeatherSection } from '@/components/CurrentWeatherSection';
</script>

<template>
  <main class="main">
    <h1 class="main--text">How's the sky looking today?</h1>
    <Search />
    <CurrentWeatherSection />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 76rem;
  padding: var(--spacing-3000) var(--spacing-1000);
}

.main--text {
  max-width: 30rem;
  font-family: var(--secondary-font);
  font-size: 3.25rem;
  line-height: 120%;
  text-align: center;
  color: var(--neutral-0);
}

@media (min-width: 768px) {
  .main {
    padding: var(--spacing-3000) var(--spacing-1500);
  }
}

@media (min-width: 1024px) {
  .main--text {
    max-width: none;
  }
}

@media (min-width: 1280px) {
  .main {
    padding: var(--spacing-3000) 0;
    margin: 0 auto;
  }
}
</style>
