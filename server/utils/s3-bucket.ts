import { AwsClient } from 'aws4fetch';
import { H3Event } from 'h3'

type BucketPaths = 'catches'

export const initS3Client = (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event)

  const s3 = new AwsClient({
    accessKeyId: runtimeConfig.S3_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: runtimeConfig.S3_BUCKET_SECRET_ACCESS_KEY,
    region: runtimeConfig.S3_BUCKET_REGION,
    service: 's3'
  })

  return s3
}

export const getPublicUrlForS3Object = (event: H3Event, path: BucketPaths, key: string) => {
  const runtimeConfig = useRuntimeConfig(event)

  return {
    url: `${runtimeConfig.public.S3_BUCKET_PUBLIC_ENDPOINT}/${path}/${key}`,
    path: `${path}/${key}`,
    endpoint: runtimeConfig.public.S3_BUCKET_PUBLIC_ENDPOINT,
  }
}

export const uploadFileToBucket = async (event: H3Event, s3Client: AwsClient, path: BucketPaths, file: File) => {
  const runtimeConfig = useRuntimeConfig(event)

  const buffer = Buffer.from(await file.arrayBuffer())

  const response = await s3Client.fetch(`${runtimeConfig.S3_BUCKET_ENDPOINT}/${path}/${file.name}`, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
    },
    body: buffer,
  })

  return response
}
