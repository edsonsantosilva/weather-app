<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheThemeSwitcher from './components/TheThemeSwitcher.vue'
import TheUnitSwitcher from './components/TheUnitSwitcher.vue'
import TheGreeting from '@/components/TheGreeting.vue'
</script>

<template>
  <div class="settings">
    <TheThemeSwitcher />
    <TheUnitSwitcher />
  </div>
  <TheGreeting />
  <header>


    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  display: flex;
}

.settings {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
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
