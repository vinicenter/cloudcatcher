export default defineEventHandler(async () => {
  const catches = await useDB().select().from(tables.catches).all()

  return catches
})
