import { getPublicUrlForS3Object } from "~/server/utils/bucket"

export default defineEventHandler(async (event) => {
  const body = await readFormData(event)

  const image = body.get('image') as File
  const title = body.get('title') as string

  const s3Client = initS3Client(event, 'catches')

  await uploadFileToS3(event, s3Client, image)

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
