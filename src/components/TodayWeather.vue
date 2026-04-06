<script setup lang="ts">
import type { WeatherInformation } from '@/types/WeatherTypes.ts'
import { useTemperatureUnit } from '@/composables/useTemperatureUnit'
import { getTemperatureColor } from '@/utils/tempUtils.ts'
import { computed } from 'vue'

const { unit } = useTemperatureUnit()

const { weatherData } = defineProps<{
  weatherData: WeatherInformation | null
}>()

const currentWeather = computed(() => {
  return weatherData?.current
})
</script>

<template>
  <div
    v-if="weatherData && currentWeather"
    class="weather-info"
    :class="getTemperatureColor(currentWeather.tempC)"
  >
    <img
      class="icon-weather-mobile"
      :src="currentWeather.condition.icon"
      :alt="currentWeather.condition.text"
    />
    <div class="weather-details">
      <img
        class="icon-weather-desktop"
        :src="currentWeather.condition.icon"
        :alt="currentWeather.condition.text"
      />
      <h2>{{ weatherData.location.name }}, {{ weatherData.location.region }}</h2>
      <p class="condition">{{ currentWeather.condition.text }}</p>
    </div>
    <div class="temp-now">
      <span>{{ unit === 'C' ? currentWeather.tempC : currentWeather.tempF }}</span>
      <span class="unit">°{{ unit }}</span>
    </div>
  </div>
  <div v-else>No weather data available</div>
</template>

<style scoped>
.weather-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: left;
  padding: 1.5rem;
  border-radius: 30px;
  color: var(--color-text);
  width: 100%;
}

.weather-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.icon-weather-desktop {
  display: none;
}

.icon-weather-mobile {
  display: unset;
}

@media (min-width: 1024px) {
  .weather-info {
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    padding: 2rem 1rem;
    border-radius: 40px;
    height: 100%;
  }

  .weather-details {
    align-items: center;
  }

  .icon-weather-desktop {
    display: unset;
  }

  .icon-weather-mobile {
    display: none;
  }
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
