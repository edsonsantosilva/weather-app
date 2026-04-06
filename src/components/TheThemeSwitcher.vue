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
    <button @click="toggleTheme">Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
  </div>
</template>

<style scoped>
.theme-switcher {
  right: 20px;
}

button {
  background: var(--color-card-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  height: 2rem;
}

button:hover {
  border-color: var(--color-link);
}
</style>
