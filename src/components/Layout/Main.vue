<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Search } from '@/components/Search';
import { CurrentWeatherSection } from '@/components/CurrentWeatherSection';
import { DailyWeatherSection } from '@/components/DailyWeatherSection';
import { HourlyWeatherSection } from '@/components/HourlyWeatherSection';
import ErrorMain from '@/components/ErrorMain/ErrorMain.vue';
import { useWeatherStore } from '@/stores/weatherStore';

const weatherStore = useWeatherStore();
const { error } = storeToRefs(weatherStore);

const noResultsMessage = ref('');

const handleMessage = (message: string) => {
  noResultsMessage.value = message;
};
</script>

<template>
  <ErrorMain v-if="error" />
  <main
    v-else
    class="main"
    data-testid="main-content"
  >
    <h1 class="main__title">How's the sky looking today?</h1>
    <Search @message="handleMessage" />
    <div
      v-if="noResultsMessage"
      class="main__error-message"
    >
      {{ noResultsMessage }}
    </div>
    <div
      v-else
      class="main__sections-container"
    >
      <CurrentWeatherSection class="main__sections-current" />
      <DailyWeatherSection class="main__sections-daily" />
      <HourlyWeatherSection class="main__sections-hourly" />
    </div>
  </main>
</template>

<style scoped>
.main__error-message {
  margin-top: var(--spacing-3000);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 120%;
  text-align: center;
  color: var(--neutral-0);
}

.main__sections-container {
  width: 100%;
}

@media (min-width: 1280px) {
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
