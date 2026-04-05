<script setup lang="ts">
import type { WeatherInformation } from '@/types/WeatherTypes.ts'
import { computed } from 'vue'

const props = defineProps<{
  weatherData: WeatherInformation | null
}>()

const forecastDays = computed(() => {
  if (
    !props.weatherData ||
    !props.weatherData.forecast ||
    !props.weatherData.forecast.forecastday
  ) {
    return []
  }
  return props.weatherData.forecast.forecastday
})

const getDayName = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
</script>

<template>
  <div v-if="forecastDays.length >= 3" class="forecast-wrapper">
    <div class="forecast-box">
      <p class="label">Today</p>
      <div class="temp">
        <span class="value">{{ forecastDays[0]?.day?.avgtempC }}</span>
        <span class="unit">°C</span>
      </div>
    </div>
    <div class="forecast-box">
      <p class="label">Tomorrow</p>
      <div class="temp">
        <span class="value">{{ forecastDays[1]?.day?.avgtempC }}</span>
        <span class="unit">°C</span>
      </div>
    </div>
    <div v-if="forecastDays[2]" class="forecast-box">
      <p class="label">{{ getDayName(forecastDays[2]?.date) }}</p>
      <div class="temp">
        <span class="value">{{ forecastDays[2]?.day?.avgtempC }}</span>
        <span class="unit">°C</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 20px;
}

.forecast-box {
  flex: 1;
  padding: 15px;
  background-color: var(--color-card-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--color-card-shadow);
  text-align: center;
  color: var(--color-text);
}

.label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.temp {
  font-size: 1.5rem;
  font-weight: bold;
}

.unit {
  font-size: 0.8rem;
  vertical-align: top;
  margin-left: 2px;
}
</style>
