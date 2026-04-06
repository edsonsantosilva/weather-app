import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type City = {
  icon: string
  name: string
  countryCode?: string
}

export const useCityStore = defineStore('cities', () => {
  const defaultCities: City[] = [
    { icon: 'd', name: 'Denver', countryCode: 'US' },
    { icon: 'rj', name: 'Rio de Janeiro', countryCode: 'BR' },
    { icon: 'm', name: 'Madrid', countryCode: 'ES' },
    { icon: 't', name: 'Tokyo', countryCode: 'JP' },
  ]

  const savedCities = localStorage.getItem('cities')
  const cities = ref<City[]>(savedCities ? JSON.parse(savedCities) : [...defaultCities])

  const savedSelectedCity = localStorage.getItem('selectedCity')
  const selectedCity = ref<string>(savedSelectedCity || 'London')

  const addCity = (cityName: string, countryCode?: string) => {
    if (cityName && !cities.value.some((city) => city.name.toLowerCase() === cityName.toLowerCase())) {
      cities.value.push({
        icon: cityName.charAt(0).toLowerCase(),
        name: cityName,
        countryCode,
      })
    }
  }

  const updateCityCountryCode = (cityName: string, countryCode: string) => {
    const city = cities.value.find((c) => c.name.toLowerCase() === cityName.toLowerCase())
    if (city) {
      city.countryCode = countryCode
    }
  }

  const removeCity = (cityName: string) => {
    cities.value = cities.value.filter((city) => city.name !== cityName)
    if (selectedCity.value === cityName) {
      selectedCity.value =
        cities.value.length > 0 && cities.value[0] ? cities.value[0].name : 'London'
    }
  }

  const clearAllCities = () => {
    cities.value = []
    selectedCity.value = 'London'
  }

  const setSelectedCity = (cityName: string) => {
    selectedCity.value = cityName
  }

  watch(
    cities,
    (newCities) => {
      localStorage.setItem('cities', JSON.stringify(newCities))
    },
    { deep: true }
  )

  watch(selectedCity, (newSelectedCity) => {
    localStorage.setItem('selectedCity', newSelectedCity)
  })

  return {
    cities,
    selectedCity,
    addCity,
    removeCity,
    updateCityCountryCode,
    setSelectedCity,
    clearAllCities,
  }
})
