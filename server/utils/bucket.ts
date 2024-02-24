import { AwsClient } from 'aws4fetch';
import { H3Event } from 'h3'

type BucketPaths = 'catches'

export const initAwsClient = (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event)

  const s3 = new AwsClient({
    accessKeyId: runtimeConfig.BUCKET_R2_ACCESS_KEY_ID,
    secretAccessKey: runtimeConfig.BUCKET_R2_SECRET_ACCESS_KEY,
  })

  return s3
}

export const getPublicUrlForS3Object = (event: H3Event, path: BucketPaths, key: string) => {
  const runtimeConfig = useRuntimeConfig(event)

  return {
    url: `${runtimeConfig.public.BUCKET_R2_PUBLIC_ENDPOINT}/${path}/${key}`,
    path: `${path}/${key}`,
    endpoint: runtimeConfig.public.BUCKET_R2_PUBLIC_ENDPOINT,
  }
}

export const uploadFileToBucket = async (event: H3Event, awsClient: AwsClient, path: BucketPaths, file: File) => {
  const runtimeConfig = useRuntimeConfig(event)

  const buffer = Buffer.from(await file.arrayBuffer())

  const response = await awsClient.fetch(`${runtimeConfig.BUCKET_R2_ENDPOINT}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
    },
    body: buffer,
  })

  console.log(JSON.stringify(response))

  return response
}
