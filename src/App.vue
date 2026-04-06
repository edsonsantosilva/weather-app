<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheThemeSwitcher from './components/TheThemeSwitcher.vue'
import TheUnitSwitcher from './components/TheUnitSwitcher.vue'
import TheGreeting from '@/components/TheGreeting.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <div class="settings">
      <TheThemeSwitcher />
      <TheUnitSwitcher />
    </div>
  </header>
  <TheGreeting />

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

nav {
  width: 50%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-link);
}

nav a:hover {
  color: var(--color-link-hover);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
