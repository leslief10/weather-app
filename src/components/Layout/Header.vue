<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { IconButton } from '@/components/ui/Button';
import HeaderDropdown from '@/components/HeaderDropdown/HeaderDropdown.vue';
import { SVGIcon } from '@/components/ui/Icons';

const isDropdownVisible: Ref<boolean> = ref(false);

const toggleDropdown = (): void => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<template>
  <header class="header">
    <img
      src="../../assets/img/logo.svg"
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
    <HeaderDropdown v-show="isDropdownVisible" />
  </header>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
</style>
