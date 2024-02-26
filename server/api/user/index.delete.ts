import { tables, useDB } from "~/server/utils/db"
import { authenticated } from "~/server/utils/authenticated"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const { user } = await authenticated(event, true)

  const { lucia } = auth(event)

  await lucia.invalidateUserSessions(user!.id)
  await useDB().delete(tables.users).where(eq(tables.users.id, user!.id))

  const blankSessionCookie = lucia.createBlankSessionCookie()

  appendHeader(event, "Set-Cookie", blankSessionCookie.serialize());

  return {
    message: 'Success!'
  }
})
