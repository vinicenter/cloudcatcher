import { authenticated } from "../../utils/authenticated"
import { eq } from "drizzle-orm"
import { Users } from "~/src/core/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  const { user } = await authenticated(event, true)

  const body = await readBody(event)

  await drizzle.update(Users).set({
    name: body.name,
    username: body.username,
  }).where(eq(Users.id, user!.id))

  return {
    message: 'Success!'
  }
})
