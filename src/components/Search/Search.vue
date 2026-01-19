<script setup lang="ts">
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/Input';
</script>

<template>
  <div class="search-container">
    <SearchInput
      placeholder="Search for a place..."
      class="search-container--input"
    />
    <Button>Search</Button>
  </div>
</template>

<style scoped>
.search-container {
  padding-top: var(--spacing-3000);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-0750);
  width: 100%;
  max-width: 41rem;
}

.search-container--input {
  width: 100%;
}

.search-container--input :deep(.search-input .input) {
  height: 3.5rem;
}

@media (min-width: 768px) {
  .search-container {
    flex-direction: row;
    gap: var(--spacing-1000);
  }
}

@media (min-width: 1024px) {
  .search-container {
    padding-top: var(--spacing-4000);
  }
}
</style>
