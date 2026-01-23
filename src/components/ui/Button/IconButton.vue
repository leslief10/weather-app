<script setup lang="ts">
import type { IconButtonProps } from '@/types';
import Button from '@/components/ui/Button/Button.vue';
import { SVGIcon } from '@/components/ui/Icons';

withDefaults(defineProps<IconButtonProps>(), {
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
  <Button
    :id="id"
    :type="type"
    :variant="variant"
    :size="size"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-expanded="ariaExpanded"
    :aria-pressed="ariaPressed"
    :data-testid="dataTestid"
    :class-name="className"
    class="icon-button"
    @click="$emit('click', $event)"
  >
    <div class="icon-button__content">
      <SVGIcon
        v-if="iconLeft"
        :name="iconLeft"
        class="icon icon-button__icon--left"
      />
      <slot />
      <SVGIcon
        v-if="iconRight"
        :name="iconRight"
        class="icon-button__icon icon-button__icon--right"
      />
    </div>
  </Button>
</template>

<style scoped>
.icon-button__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-0625);
}

.icon-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-button__icon--left {
  order: -1;
}

.icon-button__icon--right {
  order: 1;
}
</style>
