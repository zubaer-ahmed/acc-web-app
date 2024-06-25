import {createPinia, defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {useOAuth} from '~/composables/auth/oauth';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



export const useOAuthStore = defineStore('oauth', {
  state: () => ({
    redirect: useLocalStorage('redirect_data', {}),
    callback: useLocalStorage('callback_data', {})
  }),

  getters: {
    getRedirect: (state) => {
      return  state.redirect;
    },
    getCallback: (state) => {
      return state.callback;
    },
  },

  actions: {
    async setRedirect(payload: any) {
      const {redirect} = useOAuth();
      const result = await redirect(payload);
      if (result.value != null) {
        this.redirect = result.value;
        useLocalStorage('redirect_data', result.value);
      } else {
        this.redirect = {};
      }
      return this.redirect;
    },
    async setCallback(payload: any) {
      const {callback} = useOAuth();
      const result = await callback(payload);
      if (result.value != null) {
        this.redirect = result.value;
        useLocalStorage('callback_data', result.value);
      } else {
        this.redirect = {};
      }
      return this.redirect;
    },
  },

  persist: true,
});
