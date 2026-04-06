<script setup lang="ts">
const tempThresholds = [
  { label: 'Coldest', threshold: '≤ 8°C', color: 'coldest' },
  { label: 'Average', threshold: '≤ 15°C', color: 'average' },
  { label: 'Warm', threshold: '≤ 30°C', color: 'warm' },
  { label: 'Hot', threshold: '> 30°C', color: 'hot' }
]
</script>

<template>
  <main class="about">
    <div class="about-container">
      <h1>About Weather App</h1>
      <p class="intro">
        This application provides real-time weather information and forecasts for selected cities
        around the world.
      </p>

      <section class="info-section">
        <h2>Data Source</h2>
        <p>
          The weather information is powered by
          <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a>.
          The app currently provides a <strong>3-day</strong> forecast including the current day.
        </p>
      </section>

      <section class="info-section">
        <h2>Temperature Indicators</h2>
        <p>
          To help you quickly identify the weather conditions, we use a color-coding system based on
          the temperature in Celsius:
        </p>
        <div class="threshold-grid">
          <div
            v-for="item in tempThresholds"
            :key="item.label"
            class="threshold-item"
            :class="item.color"
          >
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.threshold }}</span>
          </div>
        </div>
      </section>

      <section class="info-section">
        <h2>Features</h2>
        <ul>
          <li>Real-time weather data for major cities.</li>
          <li>Detailed hourly forecast for the next 8 hours.</li>
          <li>3-day daily forecast with average temperatures.</li>
          <li>Support for both Celsius and Fahrenheit units.</li>
          <li>Dark and Light theme support with automatic persistence.</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.about {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
}

.about-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
}

.intro {
  font-size: 1.2rem;
  color: var(--color-text-soft);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.threshold-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.threshold-item {
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-text);
  font-weight: bold;
}

.threshold-item .label {
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.threshold-item .value {
  font-size: 1.2rem;
}

.coldest {
  background-color: var(--color-coldest);
}
.average {
  background-color: var(--color-average);
}
.warm {
  background-color: var(--color-warm);
}
.hot {
  background-color: var(--color-hot);
}


ul {
  padding-left: 1.5rem;
  color: var(--color-text-soft);
}

li {
  margin-bottom: 0.5rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: calc(100vh - 150px);
  }
}
</style>
