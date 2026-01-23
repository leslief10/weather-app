<script setup lang="ts">
import type { InputProps } from '@/types';

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'lg',
});

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <div class="input-wrapper">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
      :data-testid="dataTestid"
      :autocomplete="autocomplete"
      :class="['input', `input--${size}`, className, { 'input--error': error }]"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <span
      v-if="error && errorMessage"
      class="input__error-message"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-0375);
}

.input {
  color: var(--neutral-200);
  background: var(--neutral-800);
  border-radius: var(--spacing-0750);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.input:focus-visible {
  outline: var(--spacing-0125) solid var(--neutral-200);
  outline-offset: var(--spacing-0125);
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input--error {
  border: var(--spacing-0125) solid var(--orange-500);
}

.input__error-message {
  align-self: center;
  font-size: var(--spacing-0750);
  color: var(--orange-500);
}

.input--sm {
  padding: var(--spacing-0500) var(--spacing-0750);
  font-size: var(--spacing-0500);
}

.input--md {
  padding: var(--spacing-0750) var(--spacing-1000);
  font-size: var(--spacing-0750);
}

.input--lg {
  padding: var(--spacing-1000) var(--spacing-1500);
  font-size: var(--spacing-1000);
}

@media (hover: hover) {
  .input:hover {
    background-color: var(--neutral-700);
  }
}
</style>
