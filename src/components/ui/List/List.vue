<script setup lang="ts">
import type { ListProps } from '@/types';

withDefaults(defineProps<ListProps>(), {
  variant: 'unstyled',
  size: 'md',
  orientation: 'vertical',
  divided: false,
});

defineEmits<{
  'item-click': [index: number, event: MouseEvent];
}>();
</script>

<template>
  <component
    :is="variant === 'ordered' ? 'ol' : variant === 'description' ? 'dl' : 'ul'"
    :id="id"
    :data-testid="dataTestid"
    :aria-label="ariaLabel"
    :class="[
      'list',
      `list--${variant}`,
      `list--${size}`,
      `list--${orientation}`,
      { 'list--divided': divided },
      className,
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list--vertical {
  display: flex;
  flex-direction: column;
}

.list--horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.list--unordered {
  list-style: disc;
  padding-left: var(--spacing-1500);
}

.list--ordered {
  list-style: decimal;
  padding-left: var(--spacing-1500);
}

.list--description {
  display: grid;
  grid-template-columns: auto 1fr;
}

.list--unstyled {
  list-style: none;
}

.list--sm {
  gap: var(--spacing-0500);
  font-size: var(--spacing-0750);
}

.list--md {
  gap: var(--spacing-0750);
  font-size: var(--spacing-1000);
}

.list--lg {
  gap: var(--spacing-1000);
  font-size: var(--spacing-1250);
}

.list--divided.list--vertical > :deep(li:not(:last-child)),
.list--divided.list--vertical > :deep(div:not(:last-child)) {
  border-bottom: 1px solid var(--neutral-600);
}

.list--divided.list--horizontal > :deep(li:not(:last-child)),
.list--divided.list--horizontal > :deep(div:not(:last-child)) {
  border-right: 1px solid var(--neutral-600);
}

.list--description > :deep(dt) {
  font-weight: 600;
  color: var(--neutral-200);
  padding-right: var(--spacing-1000);
}

.list--description > :deep(dd) {
  color: var(--neutral-400);
  margin: 0;
}
</style>
