<script setup lang="ts">
import { useAuthStore } from './store/useAuthStore';

const store = useAuthStore()

await useAsyncData('user', () => store.getFirstTimeUser().then(() => true))
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
