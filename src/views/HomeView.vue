<script setup lang="ts">
import NextDaysForecast from '../components/NextDaysForecast.vue'
import TheCitySelector from '../components/TheCitySelector.vue'
import TodayForecast from '../components/TodayForecast.vue'
import TodayWeather from '@/components/TodayWeather.vue'
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
    <div class="weather-wrapper">
      <div class="today-weather">
        <TodayWeather :weatherData="data" />
      </div>
      <div class="forecast">
        <div class="today-forecast">
          <TodayForecast :weatherData="data" />
        </div>
        <div class="next-days-forecast">
          <NextDaysForecast :weatherData="data" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.weather-wrapper {
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
}

.today-weather,
.forecast {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forecast {
  width: 70%;
}

.today-weather {
  width: 30%
}

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
