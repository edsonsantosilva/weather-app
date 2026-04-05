<script setup lang="ts">
import TheCitySelector from '../components/TheCitySelector.vue'
import WeatherForecast from '../components/WeatherForecast.vue'
import WeatherDaysForecast from '../components/WeatherDaysForecast.vue'
import { onBeforeMount, ref } from 'vue'
import { fetchWeather } from '@/service'
import { convertKeysToCamelCase } from '@/utils/apiUtils.ts'
import type { WeatherInformation } from '@/types/WeatherTypes.ts'

const data = ref<WeatherInformation | null>(null)
const error = ref<Error | null | unknown>(null)
const selectedCity = ref<string>('London')

const selectCity = (city: string) => {
  fetchData(city)
  selectedCity.value = city
}

const fetchData = async (cityName: string) => {
  try {
    const response = await fetchWeather(cityName)
    const result = await response.json()
    data.value = convertKeysToCamelCase(result) as WeatherInformation
  } catch (e: unknown) {
    console.error(e)
    error.value = e
  }
}

onBeforeMount(() => {
  fetchData(selectedCity.value)
})
</script>

<template>
  <main>
    <TheCitySelector :selectCity="selectCity" :selectedCity="selectedCity" />
    <WeatherForecast :weatherData="data" />
    <WeatherDaysForecast :weatherData="data" />
  </main>
</template>

<style>
.coldest {
  background-color: var(--color-coldest);
}

.average {
  background-color: var(--color-average);
}

.warm {
  background-color: var(--color-warm);
}

.hot {
  background-color: var(--color-hot);
}
</style>
