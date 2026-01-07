<script setup lang="ts">
import type { ButtonProps } from '@/types';

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'lg',
  disabled: false,
  loading: false,
});

defineEmits<{
  click: [value: MouseEvent];
}>();
</script>

<template>
  <button
    :id="id"
    :type="type"
    :aria-label="ariaLabel"
    :aria-expanded="ariaExpanded"
    :aria-pressed="ariaPressed"
    :data-testid="dataTestid"
    :disabled="disabled || loading"
    :class="['btn', `btn--${variant}`, `btn--${size}`, className]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-0625);
  /* width: 100%; */
  font-weight: 500;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--primary {
  background-color: var(--blue-500);
  color: var(--neutral-0);
  border-radius: var(--spacing-0750);
}

.btn--primary:focus-visible {
  outline: var(--spacing-0125) solid var(--blue-500);
}

.btn--secondary {
  background-color: var(--neutral-800);
  color: var(--neutral-0);
  border-radius: var(--spacing-0500);
}

.btn--secondary:focus-visible {
  outline: var(--spacing-0125) solid var(--neutral-800);
}

.btn--tertiary {
  background-color: var(--neutral-600);
  color: var(--neutral-0);
  border-radius: var(--spacing-0500);
}

.btn--tertiary:focus-visible {
  outline: var(--spacing-0125) solid var(--neutral-600);
}

.btn--sm {
  padding: var(--spacing-0750) var(--spacing-1000);
  font-size: var(--spacing-0750);
}

.btn--md {
  padding: var(--spacing-0750) var(--spacing-1000);
  font-size: var(--spacing-1000);
}

.btn--lg {
  padding: var(--spacing-1000) var(--spacing-1500);
  font-size: var(--spacing-1250);
}

@media (hover: hover) {
  .btn--primary:hover {
    background-color: var(--blue-700);
  }

  .btn--secondary:hover {
    background-color: var(--neutral-700);
  }

  .btn--tertiary:hover {
    background-color: var(--neutral-700);
  }
}
</style>
