<script setup lang="ts">
import type { InputProps } from '@/types';
import Input from '@/components/ui/Input/Input.vue';
import SVGIcon from '@/components/ui/SVGIcon/SVGIcon.vue';

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'lg',
});

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <div class="search-input-container">
    <SVGIcon
      name="icon-search"
      class="search-icon"
    />
    <Input
      :id="id"
      :model-value="modelValue"
      :type="type"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder"
      :error="error"
      :error-message="errorMessage"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :aria-invalid="ariaInvalid"
      :data-testid="dataTestid"
      :autocomplete="autocomplete"
      :class-name="className"
      class="search-input"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped>
.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-1500);
  width: var(--spacing-1250);
  height: var(--spacing-1250);
  pointer-events: none;
}

.search-input {
  width: 100%;
}

.search-input :deep(.input) {
  padding-left: var(--spacing-3750);
}
</style>
