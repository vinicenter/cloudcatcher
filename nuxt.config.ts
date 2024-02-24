// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ui:{ icons: ['mdi'] },
  nitro: {
    preset: "cloudflare-pages"
  },
  runtimeConfig: {
    DB: process.env.DB as string,
    BUCKET_R2_ENDPOINT: process.env.NUXT_BUCKET_R2_ENDPOINT as string,
    BUCKET_R2_ACCESS_KEY_ID: process.env.NUXT_BUCKET_R2_ACCESS_KEY_ID as string,
    BUCKET_R2_SECRET_ACCESS_KEY: process.env.NUXT_BUCKET_R2_SECRET_ACCESS_KEY as string,
    public: {
      BUCKET_R2_PUBLIC_ENDPOINT: process.env.NUXT_BUCKET_R2_PUBLIC_ENDPOINT as string,
    }
  }
})
