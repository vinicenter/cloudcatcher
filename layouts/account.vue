<script setup lang="ts">
const { data } = useAuthFetch('/api/user')

const links = [{
  label: 'My account',
  avatar: {
    alt: data.value?.name,
    src: data.value?.avatar,
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
