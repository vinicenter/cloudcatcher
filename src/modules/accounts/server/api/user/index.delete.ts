import { authenticated } from "../../utils/authenticated"
import { eq } from "drizzle-orm"
import { Users } from "~/src/core/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  const { user } = await authenticated(event, true)

  const { lucia } = auth(event)

  await lucia.invalidateUserSessions(user!.id)
  await drizzle.delete(Users).where(eq(Users.id, user!.id))

  const blankSessionCookie = lucia.createBlankSessionCookie()

  appendHeader(event, "Set-Cookie", blankSessionCookie.serialize());

  return {
    message: 'Success!'
  }
})
