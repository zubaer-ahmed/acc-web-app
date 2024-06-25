import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    // siteKey: '6LctKgEqAAAAAJsPNVQblIBUA081w5P9iL7_glio',
    siteKey: '6Ld1TgEqAAAAAP72p3H8xXm7WNHaj8BmhY0-eyMY',
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: 'bottomright',
      },
    },
  })
})
