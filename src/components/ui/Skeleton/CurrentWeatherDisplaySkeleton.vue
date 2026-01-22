<script setup lang="ts"></script>

<template>
  <div class="current-weather-skeleton">
    <div class="loading-container">
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.current-weather-skeleton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 50rem;
  width: 100%;
  min-height: 17.87rem;
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-600);
  border-radius: var(--spacing-1250);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1000);
}

.loading-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--neutral-200);
}

.loading-dots {
  display: flex;
  gap: var(--spacing-0500);
  align-items: center;
}

.dot {
  width: var(--spacing-0750);
  height: var(--spacing-0750);
  background-color: var(--neutral-300);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  40% {
    transform: translateY(-12px);
    opacity: 1;
  }
}
</style>
