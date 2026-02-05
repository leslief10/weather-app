<script setup lang="ts">
import { ref } from 'vue';
import { IconButton } from '@/components/ui/Button';
import HeaderDropdown from '@/components/HeaderDropdown/HeaderDropdown.vue';
import { SVGIcon } from '@/components/ui/Icons';

const isDropdownVisible = ref(false);

const toggleDropdown = (): void => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const closeDropdown = (): void => {
  isDropdownVisible.value = false;
};
</script>

<template>
  <header class="header">
    <img
      src="/logo.svg"
      alt=""
      class="header--logo"
    />
    <IconButton
      variant="secondary"
      size="sm"
      @click="toggleDropdown"
    >
      <SVGIcon name="icon-units" />
      Units
      <SVGIcon name="icon-dropdown" />
    </IconButton>
    <HeaderDropdown
      v-show="isDropdownVisible"
      @close="closeDropdown"
    />
  </header>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 76rem;
  padding: var(--spacing-1000) var(--spacing-1000) 0;
}

.header--logo {
  max-width: 40%;
  height: auto;
}

@media (min-width: 768px) {
  .header {
    padding: var(--spacing-1500) var(--spacing-1500) 0;
  }
}

@media (min-width: 1024px) {
  .header {
    padding: var(--spacing-3000) var(--spacing-1500) 0;
  }
}

@media (min-width: 1280px) {
  .header {
    padding: var(--spacing-3000) 0 0;
    margin: 0 auto;
  }
}
</style>
