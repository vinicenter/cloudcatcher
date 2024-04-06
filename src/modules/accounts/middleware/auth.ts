import { useAuthStore } from '~/src/modules/accounts/store/useAuthStore';

export default defineNuxtRouteMiddleware(async () => {
  if(window) {
    return
  }

  const useStore = useAuthStore()

  const headers = useRequestHeaders(['cookie']);

  try {
    if(!useStore.user) {
      await useStore.getFirstTimeUser()
    }

    if (!useStore.isLogged) {
      return navigateTo('/')
    }
  } catch (error) {
    return navigateTo('/')
  }
})
