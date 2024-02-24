import { getPublicUrlForS3Object } from "~/server/utils/bucket"
import { initS3Client } from "../../utils/bucket"
import { useAuthenticated } from "~/server/composables/use-authenticated"
import { tables, useDB } from "~/server/composables/use-db"

export default defineEventHandler(async (event) => {
  await useAuthenticated(event, true)

  const body = await readFormData(event)

  const image = body.get('image') as File
  const title = body.get('title') as string

  const s3Client = initS3Client(event)

  await uploadFileToBucket(event, s3Client, 'catches', image)

  const publicUrl = getPublicUrlForS3Object(event, 'catches', image.name)

  await useDB().insert(tables.catches).values({
    createdAt: new Date().toISOString(),
    image: publicUrl.path,
    title: title,
  })

  return {
    message: 'Success!'
  }
})
