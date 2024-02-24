import { H3Event } from "h3"
import { useAuth } from "./use-auth"

export const useAuthenticated = async (event: H3Event, validate: boolean) => {
  const auth = useAuth(event)
  const session = getCookie(event, 'auth_session')

  if(!session) {
    if(validate) {
      throw createError({
        status: 401,
        message: 'Unauthorized'
      })
    }

    return { session: null, user: null }
  }

  const sessionData = await auth.lucia.validateSession(session)

  if(!sessionData.session || !sessionData.user) {
    throw new Error('Invalid session')
  }

  return sessionData
}
