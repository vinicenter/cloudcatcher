<script setup lang="ts">
const {
  isLogged,
  logout,
  logoutStatus,
  user,
} = useAuthState()

const login = () => window.location.assign('/api/login/github')
</script>

<template>
  <UPopover v-if="isLogged" mode="hover" :close-delay="600">
    <UAvatar :alt="user?.name" :src="user?.avatar" size="sm" />

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
          @click="logout"
          :loading="logoutStatus === 'pending'"
          variant="ghost"
        >
          Logout
        </UButton>
      </div>
    </template>
  </UPopover>

  <UButton v-else @click="login">
    Login

    <UIcon class="text-xl" name="i-mdi-github" />
  </UButton>
</template>
