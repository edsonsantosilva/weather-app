<script setup lang="ts">
const currentTime: number = new Date().getHours()
const timeGreetingLabel: string =
  currentTime < 12 ? 'morning' : currentTime < 18 ? 'afternoon' : 'night'
const username: string = 'Edson'
</script>

<template>
  <h1>Good {{ timeGreetingLabel }}, {{ username }}</h1>
</template>
