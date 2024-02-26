export default defineNuxtRouteMiddleware(async (to, from) => {
  if(!window) {
    return
  }

  try {
    const isLogged = await $fetch('/api/user/whoami', {
      cache: 'force-cache'
    })

    if (!isLogged) {
      return navigateTo('/')
    }
  } catch (error) {
    console.log(from)

    return navigateTo('/')
  }
})
