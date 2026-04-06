<script setup lang="ts">
import type { Hour, WeatherInformation } from '@/types/WeatherTypes.ts'
import { computed } from 'vue'
import { getTemperatureColor } from '@/utils/tempUtils.ts'
import { useTemperatureUnit } from '@/composables/useTemperatureUnit'

const { unit } = useTemperatureUnit()

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
  <div v-if="weatherData" class="forecast-container">
    <div
      :class="`forecast-item ${getTemperatureColor(weatherData.current.tempC)}`"
      v-for="(hour, index) in forecastHours"
      :key="hour.timeEpoch"
      class="forecast-item"
    >
      <p class="time">{{ index === 0 ? 'Now' : formatTime(hour.time) }}</p>
      <img :src="hour.condition.icon" :alt="hour.condition.text" />
      <p class="temp">{{ unit === 'C' ? hour.tempC : hour.tempF }}°{{ unit }}</p>
    </div>
  </div>
  <div v-else>
    <p>Loading weather data...</p>
  </div>
</template>

<style scoped>
.forecast-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
}

.forecast-item {
  flex: 1;
  text-align: center;
  padding: 10px;
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
