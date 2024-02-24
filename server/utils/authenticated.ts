import { H3Event } from "h3"
import { auth } from "./auth"

export const authenticated = async (event: H3Event, validate: boolean) => {
  const { lucia } = auth(event)
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

  const sessionData = await lucia.validateSession(session)

  if(!sessionData.session || !sessionData.user) {
    throw new Error('Invalid session')
  }

  return sessionData
}
