<script setup lang="ts">
import type { WeatherInformation } from '@/types/WeatherTypes.ts'
import { useTemperatureUnit } from '@/composables/useTemperatureUnit'
import { getTemperatureColor } from '@/utils/tempUtils.ts'

const { unit } = useTemperatureUnit()

const { weatherData } = defineProps<{
  weatherData: WeatherInformation | null
}>()
</script>

<template>
  <div v-if="weatherData" class="weather-info" :class="getTemperatureColor(weatherData.current.tempC, unit)">
    <h2>{{ weatherData.location.name }}, {{ weatherData.location.region }}</h2>
    <div class="temp-now">
      <span>{{ unit === 'C' ? weatherData.current.tempC : weatherData.current.tempF }}</span>
      <span class="unit">°{{ unit }}</span>
    </div>
    <p class="condition">{{ weatherData.current.condition.text }}</p>
  </div>
  <div v-else>No weather data available</div>
</template>

<style scoped>
.weather-info {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--color-card-shadow);
  color: var(--color-text);
}

.temp-now {
  font-size: 3rem;
  font-weight: bold;
}

.unit {
  font-size: 1.5rem;
  vertical-align: top;
}
</style>
