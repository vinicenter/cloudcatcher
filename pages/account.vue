<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  redirect: {
    name: 'account-informations'
  },
})
</script>

<template>
  <NuxtLayout name="account">
    <NuxtPage />
  </NuxtLayout>
</template>
