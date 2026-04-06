<script setup lang="ts">
import NextDaysForecast from '../components/NextDaysForecast.vue'
import TheCitySelector from '../components/TheCitySelector.vue'
import TodayForecast from '../components/TodayForecast.vue'
import TodayWeather from '@/components/TodayWeather.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { fetchWeather } from '@/service'
import { convertKeysToCamelCase, getCountryCode } from '@/utils/apiUtils.ts'
import type { WeatherInformation } from '@/types/WeatherTypes.ts'
import { useCityStore } from '@/stores/cityStore'

const cityStore = useCityStore()
const data = ref<WeatherInformation | null>(null)
const error = ref<Error | null | unknown>(null)

const fetchData = async (cityName: string) => {
  try {
    const response = await fetchWeather(cityName)
    const result = await response.json()
    const weatherInfo = convertKeysToCamelCase(result) as WeatherInformation
    data.value = weatherInfo

    if (weatherInfo.location.country) {
      const countryCode = getCountryCode(weatherInfo.location.country)
      if (countryCode) {
        cityStore.updateCityCountryCode(weatherInfo.location.name, countryCode)
      }
    }
  } catch (e: unknown) {
    console.error(e)
    error.value = e
  }
}

watch(() => cityStore.selectedCity, (newCity) => {
  fetchData(newCity)
})

onBeforeMount(() => {
  fetchData(cityStore.selectedCity)
})
</script>

<template>
  <main>
    <TheCitySelector />
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
  flex-direction: column;
  margin-top: 2rem;
  gap: 1.5rem;
}

.today-weather,
.forecast {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 1024px) {
  .weather-wrapper {
    flex-direction: row;
  }

  .forecast {
    width: 75%;
  }

  .today-weather {
    width: 25%;
  }
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
