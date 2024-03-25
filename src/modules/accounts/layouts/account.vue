<script setup lang="ts">
import { useAuthStore } from '~/src/modules/accounts/store/useAuthStore';

const authStore = useAuthStore()

const links = [{
  label: 'My account',
  avatar: {
    alt: authStore.user?.name,
    src: authStore.user?.avatar,
  },
  to: '/account/informations',
}, {
  label: 'Delete account',
  icon: 'i-mdi-trash-can',
  to: '/account/delete',
}]
</script>

<template>
  <div class="flex gap-4">
    <UVerticalNavigation class="w-[300px]" :links="links" />

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
