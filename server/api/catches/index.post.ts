import { getPublicUrlForS3Object, initS3Client } from "~/server/utils/s3-bucket"
import { tables, useDrizzle } from "~/server/utils/drizzle"
import { authenticated } from "~/server/utils/authenticated"

export default defineEventHandler(async (event) => {
  await authenticated(event, true)

  const body = await readFormData(event)

  const image = body.get('image') as File
  const title = body.get('title') as string

  const s3Client = initS3Client(event)

  await uploadFileToBucket(event, s3Client, 'catches', image)

  const publicUrl = getPublicUrlForS3Object(event, 'catches', image.name)

  await useDrizzle().insert(tables.catches).values({
    createdAt: new Date().toISOString(),
    image: publicUrl.path,
    title: title,
  })

  return {
    message: 'Success!'
  }
})
