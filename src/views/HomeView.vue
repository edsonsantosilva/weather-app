<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { onBeforeMount, ref } from 'vue'

const APIKEY:string = import.meta.env.VITE_API_KEY
const APIURL:string = import.meta.env.VITE_API_URL

const data = ref<Record<string, string>[]>([])
const error = ref<Error | null | unknown>(null)

const fetchData = async () => {
  try {
    const baseUrl = APIURL
    const params = {
      key: APIKEY,
      page: '1',
      q: 'London',
    }

    const queryString = new URLSearchParams(params).toString()
    const urlWithParams = `${baseUrl}?${queryString}`

    const response = await fetch(urlWithParams)
    const result = await response.json()
    console.log(result);
    data.value = result;
  } catch (e: unknown) {
    console.error(e);
    error.value = e
  }
}

onBeforeMount(() => fetchData());
</script>

<template>
  <main>
    <TheWelcome />
    <div>{{data}}</div>
  </main>
</template>
