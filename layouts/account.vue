<script setup lang="ts">
const { user } = useAuthState()

const links = [{
  label: 'My account',
  avatar: {
    alt: user.value?.username,
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
