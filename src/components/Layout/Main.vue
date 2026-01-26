<script setup lang="ts">
import Search from '@/components/Search/Search.vue';
import { CurrentWeatherSection } from '@/components/CurrentWeatherSection';
import { DailyWeatherSection } from '@/components/DailyWeatherSection';
import { HourlyWeatherSection } from '@/components/HourlyWeatherSection';
</script>

<template>
  <main class="main">
    <h1 class="main__title">How's the sky looking today?</h1>
    <Search />
    <div class="main__sections-container">
      <CurrentWeatherSection class="main__sections-current" />
      <DailyWeatherSection class="main__sections-daily" />
      <HourlyWeatherSection class="main__sections-hourly" />
    </div>
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

.main__title {
  max-width: 30rem;
  font-family: var(--secondary-font);
  font-size: 3.25rem;
  line-height: 120%;
  text-align: center;
  color: var(--neutral-0);
}

.main__sections-container {
  width: 100%;
}

@media (min-width: 768px) {
  .main {
    padding: var(--spacing-3000) var(--spacing-1500);
  }
}

@media (min-width: 1024px) {
  .main__title {
    max-width: none;
  }
}

@media (min-width: 1280px) {
  .main {
    padding: var(--spacing-3000) 0;
    margin: 0 auto;
  }

  .main__sections-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 2fr 1fr;
    gap: var(--spacing-2000);
    margin-top: var(--spacing-3000);
  }

  .main__sections-current {
    grid-area: 1 / 1 / 2 / 5;
  }

  .main__sections-daily {
    grid-area: 2 / 1 / 3 / 5;
    align-self: flex-end;
  }

  .main__sections-hourly {
    grid-area: 1 / 5 / 3 / 7;
  }
}
</style>
