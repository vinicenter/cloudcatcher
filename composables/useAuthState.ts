export const useAuthState = () => {
  const {
    data,
    status,
    error,
    execute,
  } = useFetch('/api/user/whoami')

  const isLogged = computed(() => {
    return !!data.value
  })

  const isLoading = computed(() => {
    return status.value === 'pending'
  })

  const isError = computed(() => {
    return status.value === 'error'
  })

  return {
    isError,
    isLoading,
    isLogged,
    user: data,
    refresh: execute,
    error
  };
}
