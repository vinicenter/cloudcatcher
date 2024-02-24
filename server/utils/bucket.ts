import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { H3Event } from 'h3'

type BucketPaths = 'catches'

export const initS3Client = (event: H3Event, path: BucketPaths) => {
  const runtimeConfig = useRuntimeConfig(event)

  const s3Client = new S3Client({
    endpoint: `${runtimeConfig.BUCKET_R2_ENDPOINT}/${path}`,
    credentials: {
      accessKeyId: runtimeConfig.BUCKET_R2_ACCESS_KEY_ID,
      secretAccessKey: runtimeConfig.BUCKET_R2_SECRET_ACCESS_KEY,
    },
    region: runtimeConfig.BUCKET_R2_REGION,
  })

  return s3Client
}

export const getPublicUrlForS3Object = (event: H3Event, path: BucketPaths, key: string) => {
  const runtimeConfig = useRuntimeConfig(event)

  return {
    url: `${runtimeConfig.public.BUCKET_R2_PUBLIC_ENDPOINT}/${path}/${key}`,
    path: `${path}/${key}`,
    endpoint: runtimeConfig.public.BUCKET_R2_PUBLIC_ENDPOINT,
  }
}

export const uploadFileToS3 = async (event: H3Event, s3Client: S3Client, file: File) => {
  const runtimeConfig = useRuntimeConfig(event)

  const buffer = Buffer.from(await file.arrayBuffer())

  const command = new PutObjectCommand({
    Bucket: runtimeConfig.BUCKET_R2_NAME,
    Key: file.name,
    Body: buffer,
  })

  const response = await s3Client.send(command)

  return response
}

export const getSignedUrlForS3 = async (event: H3Event, s3Client: S3Client, file: File) => {
  const runtimeConfig = useRuntimeConfig(event)

  const command = new PutObjectCommand({
    Bucket: runtimeConfig.BUCKET_R2_NAME,
    Key: file.name,
  })

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return signedUrl
}
