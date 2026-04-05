<script setup lang="ts">
import type { WeatherInformation, Hour } from '@/types/WeatherTypes.ts'
import { computed } from 'vue'

const { weatherData } = defineProps<{
  weatherData: WeatherInformation | null
}>()

const forecastHours = computed(() => {
  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday.length) {
    return []
  }

  const allHours = weatherData.forecast.forecastday.flatMap((day) => day.hour)
  const currentEpoch = weatherData.location.localtimeEpoch

  const currentHourIndex = allHours.findIndex((h) => h.timeEpoch >= currentEpoch)
  const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex
  debugger

  const result: Hour[] = []
  const JUMP_ON_HOURS = 2
  const NUMBER_OF_SLOTS = 5

  for (let i = 0; i < NUMBER_OF_SLOTS; i++) {
    const index = startIndex + i * JUMP_ON_HOURS
    if (i === 0) {
      result.push(weatherData.current as unknown as Hour)
    } else if (index < allHours.length) {
      const hourValue = allHours[index]
      if (!!hourValue) result.push(hourValue)
    }
  }
  return result
})

const formatTime = (time: string) => {
  return time.split(' ')[1]
}
</script>

<template>
  <div v-if="weatherData" class="weather-info">
    <div class="current-weather">
      <h2>{{ weatherData.location.name }}, {{ weatherData.location.region }}</h2>
      <div class="temp-now">
        <span class="value">{{ weatherData.current.tempC }}</span>
        <span class="unit">°C</span>
      </div>
      <p class="condition">{{ weatherData.current.condition.text }}</p>
    </div>

    <div class="forecast-container">
      <div v-for="(hour, index) in forecastHours" :key="hour.timeEpoch" class="forecast-item">
        <p class="time">{{ index === 0 ? 'Now' : formatTime(hour.time) }}</p>
        <img :src="hour.condition.icon" :alt="hour.condition.text" />
        <p class="temp">{{ hour.tempC }}°C</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading weather data...</p>
  </div>
</template>

<style scoped>
.weather-info {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--color-card-background);
  box-shadow: 0 2px 8px var(--color-card-shadow);
  color: var(--color-text);
}

.current-weather {
  text-align: center;
  margin-bottom: 20px;
}

.temp-now {
  font-size: 3rem;
  font-weight: bold;
}

.unit {
  font-size: 1.5rem;
  vertical-align: top;
}

.forecast-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  overflow-x: auto;
}

.forecast-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: var(--color-item-background);
  border-radius: 4px;
  min-width: 80px;
  border: 1px solid var(--color-border);
}

.time {
  font-weight: bold;
  font-size: 0.9rem;
}

.temp {
  font-size: 1.1rem;
}
</style>
