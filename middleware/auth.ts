export default defineNuxtRouteMiddleware(async (to, from) => {
  if(!window) {
    return
  }

  try {
    const isLogged = await $fetch('/api/user/whoami')

    if (!isLogged) {
      return navigateTo('/')
    }
  } catch (error) {
    console.log(from)

    return navigateTo('/')
  }
})
