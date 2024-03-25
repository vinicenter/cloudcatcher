import { getPublicUrlForS3Object, initS3Client } from "~/src/core/server/utils/s3-bucket"
import { authenticated } from "~/src/modules/accounts/server/utils/authenticated"
import { z } from 'zod'
import { Catches } from "~/src/core/server/database/schema"

const newCatchSchema = z.object({
  title: z.string(),
  image: z.instanceof(File),
})

export default defineEventHandler(async (event) => {
  const drizzle = event.context.drizzle

  await authenticated(event, true)

  const body = await readFormData(event)

  const data = newCatchSchema.parse({
    title: body.get('title'),
    image: body.get('image'),
  })

  const s3Client = initS3Client(event)
  await uploadFileToBucket(event, s3Client, 'catches', data.image)

  const publicUrl = getPublicUrlForS3Object(event, 'catches', data.image.name)

  await drizzle.insert(Catches).values({
    createdAt: new Date().toISOString(),
    image: publicUrl.path,
    title: data.title,
  })

  return {
    message: 'Success!'
  }
})
