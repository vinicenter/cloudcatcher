import { Catches } from "~/src/core/server/database/schema"

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  const catches = await drizzle.select().from(Catches).all()

  return catches
})
