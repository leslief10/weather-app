<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Button } from '@/components/ui/Button';
import { List, ListItem } from '@/components/ui/List';
import { SVGIcon } from '@/components/ui/Icons';
import { useUnitsStore } from '@/stores/unitsStore';

const unitsStore = useUnitsStore();
const { temperatureUnit, windSpeedUnit, precipitationUnit, isImperial } =
  storeToRefs(unitsStore);

const emit = defineEmits<{
  close: [];
}>();

const handleUnitSwitch = (): void => {
  if (isImperial.value) {
    unitsStore.switchToMetric();
  } else {
    unitsStore.switchToImperial();
  }
  emit('close');
};

const selectTemperatureUnit = (unit: 'celsius' | 'fahrenheit'): void => {
  temperatureUnit.value = unit;
  emit('close');
};

const selectWindSpeedUnit = (unit: 'kmh' | 'mph'): void => {
  windSpeedUnit.value = unit;
  emit('close');
};

const selectPrecipitationUnit = (unit: 'mm' | 'inch'): void => {
  precipitationUnit.value = unit;
  emit('close');
};

const unitSwitchText = computed(() =>
  isImperial.value ? 'Switch to Metric' : 'Switch to Imperial',
);
</script>

<template>
  <div class="header-dropdown">
    <Button
      variant="secondary"
      size="sm"
      class="dropdown--btn"
      @click="handleUnitSwitch"
      >{{ unitSwitchText }}</Button
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
          @click="selectTemperatureUnit('celsius')"
          >Celsius (°C)
          <template #trailing
            ><SVGIcon
              v-if="temperatureUnit === 'celsius'"
              name="icon-checkmark"
          /></template>
        </ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          @click="selectTemperatureUnit('fahrenheit')"
          >Fahrenheit (°F)
          <template #trailing
            ><SVGIcon
              v-if="temperatureUnit === 'fahrenheit'"
              name="icon-checkmark" /></template
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
          @click="selectWindSpeedUnit('kmh')"
          >km/h
          <template #trailing
            ><SVGIcon
              v-if="windSpeedUnit === 'kmh'"
              name="icon-checkmark" /></template
        ></ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          @click="selectWindSpeedUnit('mph')"
          >mph
          <template #trailing
            ><SVGIcon
              v-if="windSpeedUnit === 'mph'"
              name="icon-checkmark" /></template
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
          @click="selectPrecipitationUnit('mm')"
          >Millimeters (mm)
          <template #trailing
            ><SVGIcon
              v-if="precipitationUnit === 'mm'"
              name="icon-checkmark" /></template
        ></ListItem>
        <ListItem
          interactive
          class="dropdown--units-list-item"
          @click="selectPrecipitationUnit('inch')"
          >Inches (in)
          <template #trailing
            ><SVGIcon
              v-if="precipitationUnit === 'inch'"
              name="icon-checkmark" /></template
        ></ListItem>
      </List>
    </div>
  </div>
</template>

<style scoped>
.header-dropdown {
  position: absolute;
  right: var(--spacing-1000);
  top: 3.625rem;
  max-width: 13.375rem;
  padding: var(--spacing-0375) var(--spacing-0500);
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-600);
  border-radius: var(--spacing-0750);
  box-shadow: 0px 8px 16px 0px rgba(2, 1, 44, 0.32);
  z-index: 1;
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

@media (min-width: 1024px) {
  .header-dropdown {
    top: 6.375rem;
  }
}

@media (min-width: 1024px) {
  .header-dropdown {
    right: 0;
  }
}
</style>
