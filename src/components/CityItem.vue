<script setup lang="ts"></script>
<template>
  <div class="item">
    <slot></slot> - <slot name="icon"></slot>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item:hover {
  border-color: var(--color-border-hover);
  background: var(--color-hover-city);
}

.city-selected {
  background-color: var(--color-selected-city);
}

@media (min-width: 1024px) {
  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
