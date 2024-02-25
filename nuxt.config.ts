// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ui:{ icons: ["mdi"] },
  nitro: {
    preset: "cloudflare-pages"
  },
  runtimeConfig: {
    DB: process.env.DB as string,
    BUCKET_R2_ENDPOINT: process.env.NUXT_BUCKET_R2_ENDPOINT as string,
    BUCKET_R2_ACCESS_KEY_ID: process.env.NUXT_BUCKET_R2_ACCESS_KEY_ID as string,
    BUCKET_R2_SECRET_ACCESS_KEY: process.env.NUXT_BUCKET_R2_SECRET_ACCESS_KEY as string,
    BUCKET_R2_REGION: process.env.NUXT_BUCKET_R2_REGION as string,
    GITHUB_CLIENT_ID: process.env.NUXT_GITHUB_CLIENT_ID as string,
    GITHUB_CLIENT_SECRET: process.env.NUXT_GITHUB_CLIENT_SECRET as string,
    public: {
      BUCKET_R2_PUBLIC_ENDPOINT: process.env.NUXT_BUCKET_R2_PUBLIC_ENDPOINT as string,
    }
  }
})
