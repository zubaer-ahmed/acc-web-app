export default defineNuxtConfig({
  devServer: {
    port: 8000,
  },
  extends: [
    '../layers/tairo',
    '../layers/tairo-layout-sidebar',
    '../layers/tairo-layout-collapse',
    '../layers/tairo-layout-topnav',
    '../layers/landing',
  ],

  css: [
    '~/assets/css/colors.css',
    '@fontsource-variable/fira-code/index.css',
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/karla/index.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'nuxt-bugsnag',
  ],
  runtimeConfig: {
    public: {
      authWeb: 'https://acc-auth-app-13ee445f79a8.herokuapp.com',
      authApi: 'https://acc-auth-app-13ee445f79a8.herokuapp.com/api',
      accApi: 'https://acc-acc-app-eef9e6a18a9b.herokuapp.com/api',
      app_auth_uid: 'e7bfb07b-2149-4040-9f27-ef472dc01459',
      app_acc_uid: '306d017b-c2a4-4e47-818e-eeecae56238a',
    },
  },
  ssr: false,
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  vite: {
    define: {
      // 'process.test': false,
      // 'process.env.VSCODE_TEXTMATE_DEBUG': false,
      // 'process.env.ENABLE_A11Y_AXE': process.env.ENABLE_A11Y_AXE,
    },
    build: {
      target: 'esnext',
    },
  },
  bugsnag: {
    publishRelease: true,
    config: {
      apiKey: '65ffda685ff8c16a7a024e4cc1c9ee41',
      // enabledReleaseStages: ['staging', 'production'],
      releaseStage: process.env.NODE_ENV,
      // appVersion: 'YOUR_VERSION',
    },
  },
})
