<script setup lang="ts">
import CityItem from './CityItem.vue'
import { ref } from 'vue'
import { useCityStore } from '@/stores/cityStore'

const cityStore = useCityStore()

const newCityName = ref('')

const addNewCity = () => {
  if (newCityName.value.trim()) {
    cityStore.addCity(newCityName.value.trim())
    newCityName.value = ''
  }
}

const selectCity = (cityName: string) => {
  cityStore.setSelectedCity(cityName)
}

const clearAll = () => {
  cityStore.clearAllCities()
}
</script>

<template>
  <div class="city-selector">
    <div class="city-wrapper">
      <CityItem
        v-for="city in cityStore.cities"
        :key="city.name"
        :class="cityStore.selectedCity === city.name ? 'city-selected' : ''"
        @click="() => selectCity(city.name)"
      >
        <template #icon>
          <img
            v-if="city.countryCode"
            :src="`https://flagsapi.com/${city.countryCode}/flat/64.png`"
            :alt="city.name"
            class="flag"
          />
          <span v-else>{{ city.icon }}</span>
        </template>
        {{ city.name }}
      </CityItem>
    </div>

    <div class="add-city-form">
      <input
        v-model="newCityName"
        type="text"
        placeholder="Add a new city..."
        @keyup.enter="addNewCity"
      />
      <button class="add-city" @click="addNewCity">+</button>
      <button @click="clearAll">Clear All</button>
    </div>
  </div>
</template>

<style scoped>
.city-selector {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: transparent;
}

.city-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.add-city-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

input {
  flex: 1;
  background: var(--color-card-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
  min-width: 0;
}

@media (min-width: 1024px) {
  .city-selector {
    flex-direction: row;
    align-items: center;
  }

  .city-wrapper {
    width: 70%;
  }

  .add-city-form {
    width: 30%;
  }
}

input:focus {
  border-color: var(--color-link);
}

button {
  background: var(--color-card-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  border-radius: 4px;
  height: 2rem;
  padding: 8px 12px;
}

.add-city {
  background: var(--color-link);
  width: 32px;
  border-radius: 50%;
  transition: opacity 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

.flag {
  width: 24px;
  height: auto;
  object-fit: contain;
}
</style>
