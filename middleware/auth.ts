export default defineNuxtRouteMiddleware(async () => {
  if(window) {
    return
  }

  try {
    const isLogged = await authFetch('/api/user')

    if (!isLogged) {
      return navigateTo('/')
    }
  } catch (error) {
    return navigateTo('/')
  }
})
