<script setup lang="ts">
import { SVGIcon } from '@/components/ui/Icons';
import { IconButton } from '@/components/ui/Button';

const handleRetry = () => {
  window.location.reload();
};
</script>

<template>
  <main class="main">
    <img
      src="/icon-error.svg"
      alt="Error connecting to the server"
      class="main__icon"
    />
    <h1 class="main__title">Something went wrong</h1>
    <p class="main__text">
      We couldn't connect to the server (API error). Please try again in a few
      moments.
    </p>
    <IconButton
      variant="secondary"
      size="md"
      @click="handleRetry"
    >
      <SVGIcon name="icon-retry" />
      Retry
    </IconButton>
  </main>
</template>

<style scoped>
.main {
  gap: var(--spacing-1500);
}

.main__icon {
  width: 3.125rem;
  height: 3.125rem;
}

.main__text {
  max-width: 35rem;
  font-size: var(--spacing-1250);
  font-weight: 300;
  line-height: 120%;
  text-align: center;
  color: var(--neutral-0);
}

@media (min-width: 768px) {
  .main__title {
    max-width: none;
  }
}
</style>
