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
      <img :src="day.condition.icon" :alt="day.condition.text" />
      <p class="label">{{ getDayName(day.date) }}</p>
      <p class="condition-label">{{ day.condition.text }}</p>
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
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.forecast-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  color: var(--color-text);
  width: 100%;
}

.forecast-box img {
  width: 40px;
}

.label {
  flex: 1;
  text-align: left;
  margin-left: 1rem;
  font-weight: var(--font-weight-semi-bold);
  font-size: 1rem;
}

.condition-label {
  display: none;
}

@media (min-width: 768px) {
  .forecast-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }

  .forecast-box {
    flex: 1;
    flex-direction: column;
    padding: 15px;
    border-radius: 30px;
    text-align: center;
  }

  .forecast-box img {
    width: auto;
  }

  .label {
    text-align: center;
    margin-left: 0;
  }

  .condition-label {
    display: block;
    font-weight: var(--font-weight-semi-bold);
    margin-bottom: 10px;
    font-size: 0.75rem;
    color: var(--color-text-soft);
  }
}

.temp {
  font-size: 1.25rem;
  font-weight: bold;
}

.unit {
  font-size: 0.8rem;
  vertical-align: top;
  margin-left: 2px;
}
</style>
