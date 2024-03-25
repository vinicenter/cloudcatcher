// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "nitro-cloudflare-dev"],
  pinia: {
    storesDirs: [
      "~/src/modules/account/store",
    ],
  },
  ui:{
    icons: ["mdi"],
  },
  nitro: {
    preset: "cloudflare-pages"
  },
  runtimeConfig: {
    S3_BUCKET_ENDPOINT: process.env.NUXT_S3_BUCKET_ENDPOINT as string,
    S3_BUCKET_ACCESS_KEY_ID: process.env.NUXT_S3_BUCKET_ACCESS_KEY_ID as string,
    S3_BUCKET_SECRET_ACCESS_KEY: process.env.NUXT_S3_BUCKET_SECRET_ACCESS_KEY as string,
    S3_BUCKET_REGION: process.env.NUXT_S3_BUCKET_REGION as string,
    GITHUB_CLIENT_ID: process.env.NUXT_GITHUB_CLIENT_ID as string,
    GITHUB_CLIENT_SECRET: process.env.NUXT_GITHUB_CLIENT_SECRET as string,
    public: {
      S3_BUCKET_PUBLIC_ENDPOINT: process.env.NUXT_S3_BUCKET_PUBLIC_ENDPOINT as string,
    }
  },
  extends: [
    './src/core/',
    './src/modules/home',
    './src/modules/accounts',
    './src/modules/devices',
    './src/modules/catches',
  ],
})