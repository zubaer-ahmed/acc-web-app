import TawkMessengerVue from '@tawk.to/tawk-messenger-vue-3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TawkMessengerVue, {
    propertyId : '66680827981b6c56477bd899',
    widgetId : '1i035vmqo'
  });
});
