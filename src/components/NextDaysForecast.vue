<script setup lang="ts">
import type { WeatherInformation } from '@/types/WeatherTypes.ts'
import { computed } from 'vue'
import { getTemperatureColor } from '@/utils/tempUtils.ts'
import { useTemperatureUnit } from '@/composables/useTemperatureUnit'

const { unit } = useTemperatureUnit()

const NOW = new Date()

const props = defineProps<{
  weatherData: WeatherInformation | null
}>()

const forecastDays = computed(() => {
  const forecastDay = props.weatherData?.forecast?.forecastday
  if (!forecastDay) return []
  return forecastDay.map((day) => {
    return {
      date: day.date,
      avgtempC: day.day.avgtempC,
      avgtempF: day.day.avgtempF,
      condition: day.day.condition,
    }
  })
})

const getDayName = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  if (date.getDay() === NOW.getDay()) return 'Today'
  if (date.getDay() === NOW.getDay() + 1) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
</script>

<template>
  <div class="forecast-wrapper">
    <div
      v-for="day in forecastDays"
      :key="day.date"
      :class="getTemperatureColor(day?.avgtempC)"
      class="forecast-box"
    >
      <p class="label">{{ getDayName(day.date) }}</p>
      <div class="temp">
        <span class="value">{{ unit === 'C' ? day?.avgtempC : day?.avgtempF }}</span>
        <span class="unit">°{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.forecast-box {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--color-card-shadow);
  text-align: center;
  color: var(--color-text);
}

.unknown {
  background-color: var(--color-card-background);
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
