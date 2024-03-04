import { getPublicUrlForS3Object, initS3Client } from "~/server/utils/s3-bucket"
import { tables, useDrizzle } from "~/server/utils/drizzle"
import { authenticated } from "~/server/utils/authenticated"
import { z } from 'zod'

const newCatchSchema = z.object({
  title: z.string(),
  image: z.instanceof(File),
})

export default defineEventHandler(async (event) => {
  await authenticated(event, true)

  const body = await readFormData(event)

  const data = newCatchSchema.parse({
    title: body.get('title'),
    image: body.get('image'),
  })

  const s3Client = initS3Client(event)
  await uploadFileToBucket(event, s3Client, 'catches', data.image)

  const publicUrl = getPublicUrlForS3Object(event, 'catches', data.image.name)

  await useDrizzle().insert(tables.catches).values({
    createdAt: new Date().toISOString(),
    image: publicUrl.path,
    title: data.title,
  })

  return {
    message: 'Success!'
  }
})
