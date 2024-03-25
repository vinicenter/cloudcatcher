<script setup lang="ts">
import { useAuthStore } from '~/src/modules/accounts/store/useAuthStore';

const authStore = useAuthStore()
</script>

<template>
  <UPopover v-if="authStore.isLogged" mode="hover" :close-delay="600">
    <UAvatar :alt="authStore.user?.name" :src="authStore.user?.avatar" size="sm" />

    <template #panel>
      <div class="p-2 flex flex-col">

        <UButton
          active-class="bg-green-950"
          to="/account"
          variant="ghost"
        >
          My account
        </UButton>

        <UDivider class="my-2" />
        
        <UButton
          @click="authStore.logout"
          :loading="authStore.logoutLoading"
          variant="ghost"
        >
          Logout
        </UButton>
      </div>
    </template>
  </UPopover>

  <UButton v-else @click="authStore.login">
    Login

    <UIcon class="text-xl" name="i-mdi-github" />
  </UButton>
</template>
