import { tables, useDB } from "~/server/composables/use-db"

export default defineEventHandler(async () => {
  const catches = await useDB().select().from(tables.catches).all()

  return catches
})
