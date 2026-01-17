<script setup lang="ts">
import { Button } from '@/components/ui/Button';
import { List, ListItem } from '@/components/ui/List';
import { SVGIcon } from '@/components/ui/Icons';
</script>

<template>
  <div class="header-dropdown">
    <Button
      variant="secondary"
      size="sm"
      class="dropdown--btn"
      >Switch to Imperial</Button
    >
    <div class="dropdown--units">
      <p class="dropdown--units-text">Temperature</p>
      <List
        size="sm"
        class="dropdown--units-list"
      >
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >Celsius (°C)
          <template #trailing><SVGIcon name="icon-checkmark" /></template>
        </ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >Fahrenheit (°F)
          <template #trailing><SVGIcon name="icon-checkmark" /></template
        ></ListItem>
      </List>
    </div>
    <div class="dropdown--units">
      <p class="dropdown--units-text">Wind Speed</p>
      <List
        size="sm"
        class="dropdown--units-list"
      >
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >km/h <template #trailing><SVGIcon name="icon-checkmark" /></template
        ></ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >mph <template #trailing><SVGIcon name="icon-checkmark" /></template
        ></ListItem>
      </List>
    </div>
    <div class="dropdown--units">
      <p class="dropdown--units-text">Precipitation</p>
      <List
        size="sm"
        class="dropdown--units-list"
      >
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >Millimeters (mm)
          <template #trailing><SVGIcon name="icon-checkmark" /></template
        ></ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          >Inches (in)
          <template #trailing><SVGIcon name="icon-checkmark" /></template
        ></ListItem>
      </List>
    </div>
  </div>
</template>

<style scoped>
.header-dropdown {
  padding: var(--spacing-0375) var(--spacing-0500);
  max-width: 13.375rem;
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-600);
  border-radius: var(--spacing-0750);
  position: absolute;
  right: var(--spacing-1000);
  top: 4.375rem;
}

.dropdown--btn {
  justify-content: flex-start;
  width: 100%;
  padding: var(--spacing-0625) var(--spacing-0500);
  font-size: var(--spacing-1000);
  text-align: left;
}

.dropdown--units:not(:last-of-type) {
  padding-block: var(--spacing-0250);
  border-bottom: 1px solid var(--neutral-600);
}

.dropdown--units-text {
  margin: var(--spacing-0375) 0 0 var(--spacing-0500);
  font-size: var(--spacing-0750);
  font-weight: 400;
  color: var(--neutral-300);
}

.dropdown--units-list {
  gap: var(--spacing-0250);
}

.dropdown--units-list-item {
  padding: var(--spacing-0625) var(--spacing-0500);
  border-radius: var(--spacing-0500);
}

@media (min-width: 768px) {
  .header-dropdown {
    right: var(--spacing-1500);
    top: 4.75rem;
  }
}
</style>
