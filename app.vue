<script setup lang="ts">
import { useAuthStore } from './store/useAuthStore';

const store = useAuthStore()

await useAsyncData('user', () => store.getUser().then(() => true))
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
