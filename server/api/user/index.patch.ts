import { tables, useDB } from "~/server/utils/db"
import { authenticated } from "~/server/utils/authenticated"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const { user } = await authenticated(event, true)

  const body = await readBody(event)

  await useDB().update(tables.users).set({
    name: body.name,
    username: body.username,
  }).where(eq(tables.users.id, user!.id))

  return {
    message: 'Success!'
  }
})
