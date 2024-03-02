import { tables, useDrizzle } from "~/server/utils/drizzle"

export default defineEventHandler(async () => {
  const catches = await useDrizzle().select().from(tables.catches).all()

  return catches
})
