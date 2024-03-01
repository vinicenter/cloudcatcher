<script setup lang="ts">
import { useAuthStore } from './store/useAuthStore';

const {
  getUser
} = useAuthStore()

getUser()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
