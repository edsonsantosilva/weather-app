<script setup lang="ts">
import { useTemperatureUnit } from '@/composables/useTemperatureUnit'

const { unit, toggleUnit } = useTemperatureUnit()
</script>

<template>
  <div class="unit-switcher">
    <button @click="toggleUnit" class="unit-btn">
      <span :class="{ active: unit === 'C' }">°C</span>
      <span class="divider">/</span>
      <span :class="{ active: unit === 'F' }">°F</span>
    </button>
  </div>
</template>

<style scoped>
.unit-switcher {
  right: 80px;
}

.unit-btn {
  background: var(--color-card-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.unit-btn:hover {
  border-color: var(--color-link);
}

.active {
  color: var(--color-link);
}

.divider {
  font-weight: normal;
  color: var(--color-border);
}
</style>
