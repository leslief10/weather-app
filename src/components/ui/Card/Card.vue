<script setup lang="ts">
import type { CardProps } from '@/types';

withDefaults(defineProps<CardProps>(), {
  variant: 'outlined',
  size: 'md',
});
</script>

<template>
  <article
    :id="id"
    :data-testid="dataTestid"
    :aria-label="ariaLabel"
    :class="['card', `card--${variant}`, `card--${size}`, className]"
  >
    <slot />
  </article>
</template>

<style scoped>
.card {
  border: none;
}

.card--elevated {
  background-color: var(--neutral-700);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card--outlined {
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-600);
}

.card--flat {
  background-color: var(--neutral-700);
}

.card--sm {
  padding: var(--spacing-0750);
  border-radius: var(--spacing-0500);
}

.card--md {
  padding: var(--spacing-1000);
  border-radius: var(--spacing-0750);
}

.card--lg {
  padding: var(--spacing-1500);
  border-radius: var(--spacing-0750);
}
</style>
