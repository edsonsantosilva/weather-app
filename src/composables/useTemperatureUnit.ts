import { ref, watch } from 'vue'

const unit = ref<'C' | 'F'>(localStorage.getItem('tempUnit') as 'C' | 'F' || 'C')

export function useTemperatureUnit() {
  const toggleUnit = () => {
    unit.value = unit.value === 'C' ? 'F' : 'C'
  }

  watch(unit, (newUnit) => {
    localStorage.setItem('tempUnit', newUnit)
  })

  return {
    unit,
    toggleUnit,
  }
}
