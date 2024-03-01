export default defineNuxtRouteMiddleware(async () => {
  if(window) {
    return
  }

  const headers = useRequestHeaders(['cookie']);

  try {
    const isLogged = await $fetch('/api/user', {
      headers
    })

    if (!isLogged) {
      return navigateTo('/')
    }
  } catch (error) {
    return navigateTo('/')
  }
})
