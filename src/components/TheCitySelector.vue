<script setup lang="ts">
import CityItem from './CityItem.vue'
import { ref } from 'vue'

const props = defineProps({
  selectCity: {
    type: Function,
    required: true,
  },
})

type City = {
  icon: string
  name: string
}

const listOfInitialCities: City[] = [
  {
    icon: 'd',
    name: 'Denver',
  },
  {
    icon: 'rj',
    name: 'Rio de Janeiro',
  },
  {
    icon: 'm',
    name: 'Madrid',
  },
  {
    icon: 't',
    name: 'Tokyo',
  },
]

const listOfCities = ref<City[]>([...listOfInitialCities])

const selectCity = (cityName: string) => {
  props.selectCity(cityName)
}
</script>

<template>
  <div class="city-wrapper">
    <CityItem v-for="city in listOfCities" :key="city.name" @click="() => selectCity(city.name)">
      <template #icon>
        {{ city.icon }}
      </template>

      {{ city.name }}
    </CityItem>
  </div>
</template>

<style scoped>
.city-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
