interface User {
  id: string
  avatar: string
  githubId: number
  name: string
  username: string
}

interface States {
  isLogged?: boolean
  user?: User
  logoutLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): States => ({
    isLogged: undefined,
    user: undefined,
    logoutLoading: false,
  }),
  actions: {
    async getUser() {
      return useAuthFetch('/api/user', {
        onResponse: async ({response}) => {
          if(response.status === 401) {
            return
          }

          const data = response._data as User;

          this.user = (response !== null) ? data : undefined;
          this.isLogged = true;
        }
      })
    },
    async getFirstTimeUser() {
      if (!!this.user) {
        return
      }

      return await this.getUser()
    },
    async logout() {
      try {
        this.logoutLoading = true

        await $fetch('/api/logout')

        this.isLogged = false
        this.user = undefined

        navigateTo('/')
      }
      catch {
        console.error('Failed to logout')
      }
      finally {
        this.logoutLoading = false
      }
    },
    async login() {
      window.location.assign('/api/login/github')
    }
  }
})
