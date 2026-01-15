<script setup lang="ts">
import type { ListItemProps } from '@/types';

withDefaults(defineProps<ListItemProps>(), {
  interactive: false,
  selected: false,
  disabled: false,
  size: 'md',
});

defineEmits<{
  click: [event: Event];
}>();
</script>

<template>
  <li
    :id="id"
    :data-testid="dataTestid"
    :aria-label="ariaLabel"
    :aria-selected="selected"
    :aria-disabled="disabled"
    :class="[
      'list-item',
      `list-item--${size}`,
      {
        'list-item--interactive': interactive,
        'list-item--selected': selected,
        'list-item--disabled': disabled,
      },
      className,
    ]"
    :tabindex="interactive && !disabled ? 0 : undefined"
    :role="interactive ? 'button' : undefined"
    @click="!disabled && interactive ? $emit('click', $event) : undefined"
    @keydown.enter.prevent="
      !disabled && interactive ? $emit('click', $event) : undefined
    "
    @keydown.space.prevent="
      !disabled && interactive ? $emit('click', $event) : undefined
    "
  >
    <span
      v-if="$slots.leading"
      class="list-item__leading"
    >
      <slot name="leading" />
    </span>
    <span class="list-item__content">
      <slot />
    </span>
    <span
      v-if="$slots.trailing"
      class="list-item__trailing"
    >
      <slot name="trailing" />
    </span>
  </li>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  color: var(--neutral-0);
  transition: all 0.2s ease;
}

.list-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.list-item__leading {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-0750);
}

.list-item__trailing {
  display: flex;
  align-items: center;
  margin-left: var(--spacing-0750);
}

.list-item--sm {
  padding: var(--spacing-0500);
  font-size: var(--spacing-0750);
}

.list-item--md {
  padding: var(--spacing-0750);
  font-size: var(--spacing-1000);
}

.list-item--lg {
  padding: var(--spacing-1000);
  font-size: var(--spacing-1250);
}

.list-item--interactive {
  cursor: pointer;
}

.list-item--interactive:focus-visible {
  outline: var(--spacing-0125) solid var(--neutral-800);
}

.list-item--selected {
  background-color: var(--neutral-700);
}

.list-item--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (hover: hover) {
  .list-item--interactive:not(.list-item--disabled):hover {
    background-color: var(--neutral-700);
  }
}
</style>
