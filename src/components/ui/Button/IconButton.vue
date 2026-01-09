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
    <div class="icon-button-content">
      <SVGIcon
        v-if="iconLeft"
        :name="iconLeft"
        class="icon icon--left"
      />
      <slot />
      <SVGIcon
        v-if="iconRight"
        :name="iconRight"
        class="icon icon--right"
      />
    </div>
  </Button>
</template>

<style scoped>
.icon-button-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-0625);
}

.icon {
  /* width: var(--spacing-1000);
  height: var(--spacing-1000); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon--left {
  order: -1;
}

.icon--right {
  order: 1;
}
</style>
