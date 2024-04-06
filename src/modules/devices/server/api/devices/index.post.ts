import { H3Event } from 'h3'
import { z } from 'zod'
import { Devices } from '~/src/core/server/database/schema'

const createDeviceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export default defineEventHandler(async (event: H3Event) => {
  const drizzle = event.context.drizzle

  const { user } = await authenticated(event, true)

  const body = createDeviceSchema.parse(await readBody(event))

  const data = await drizzle.insert(Devices).values({
    ...body,
    userId: user!.id,
  })

  return data
})
