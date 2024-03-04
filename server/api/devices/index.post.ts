import { H3Event } from 'h3'
import { z } from 'zod'

const createDeviceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export default defineEventHandler(async (event: H3Event) => {
  const { user } = await authenticated(event, true)

  const body = createDeviceSchema.parse(await readBody(event))

  const data = await useDrizzle().insert(tables.devices).values({
    ...body,
    userId: user!.id,
  })

  return data
})
