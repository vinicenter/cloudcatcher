export const useAuthState = () => {
  const {
    data,
    status,
    error,
    refresh,
  } = useFetch('/api/user/whoami', {
    cache: 'reload'
  })

  const isLogged = computed(() => {
    return !!data.value
  })

  const isLoading = computed(() => {
    return status.value === 'pending'
  })

  const isError = computed(() => {
    return status.value === 'error'
  })

  const {
    execute: logout,
    status: logoutStatus,
  } = useFetch('/api/logout', {
    immediate: false,
    onResponse: () => {
      refresh();

      window.location.assign('/')
    },
  })

  return {
    isError,
    isLoading,
    isLogged,
    user: data,
    refresh,
    logoutStatus,
    logout,
    error
  };
}
