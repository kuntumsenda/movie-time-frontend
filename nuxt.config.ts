// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/color-mode", "nuxt-icon-tw", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  plugins: ["~/plugins/axios", "~/plugins/datefns"],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.BASE_URL,
    },
  },
});
