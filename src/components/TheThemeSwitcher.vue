<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<template>
  <div class="theme-switcher">
    <button @click="toggleTheme">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--color-border-hover);
}
</style>
