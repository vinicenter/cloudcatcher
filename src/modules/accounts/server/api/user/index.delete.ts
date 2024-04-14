import { authenticated } from "../../utils/authenticated"
import { eq } from "drizzle-orm"
import { Devices, Sessions, Users } from "~/src/core/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  const { user, session } = await authenticated(event, true)
  const { lucia } = auth(event)

  if(user) {
    await lucia.invalidateUserSessions(user.id)
  }

  if(session) {
    await lucia.invalidateSession(session.id)
  }

  appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());

  const promisses = [
    drizzle.delete(Sessions).where(eq(Sessions.id, session!.id)),
    drizzle.delete(Devices).where(eq(Devices.userId, user!.id)),
  ]

  await Promise.all(promisses)

  await drizzle.delete(Users).where(eq(Users.id, user!.id))

  return {
    message: 'Success!'
  }
})
