import { tables, useDrizzle } from "~/server/utils/drizzle"
import { authenticated } from "~/server/utils/authenticated"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  console.log('deletou')

  const { user } = await authenticated(event, true)

  const { lucia } = auth(event)

  await lucia.invalidateUserSessions(user!.id)
  await useDrizzle().delete(tables.users).where(eq(tables.users.id, user!.id))

  const blankSessionCookie = lucia.createBlankSessionCookie()

  appendHeader(event, "Set-Cookie", blankSessionCookie.serialize());

  return {
    message: 'Success!'
  }
})
