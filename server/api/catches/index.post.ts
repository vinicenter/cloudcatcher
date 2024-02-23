export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await useDB().insert(tables.catches).values({
    createdAt: new Date().toISOString(),
    ipfsCid: body.ipfsCid,
    title: body.title,
  })

  return {
    body: 'Catch created!',
  }
})
