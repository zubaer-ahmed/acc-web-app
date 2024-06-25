import {createPinia, defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {useRecaptcha} from '~/composables/auth/recaptcha';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



export const useRecaptchaStore = defineStore('recaptcha', {
  state: () => ({
    recaptcha: useLocalStorage('recaptcha_data', {}),
  }),

  getters: {
    getRecaptcha:(state)=>{
      return state.recaptcha;
    },
  },

  actions: {
    async setRecaptcha(payload: any) {
      const {verifyResponse} = useRecaptcha();
      const result = await verifyResponse(payload);
      if (result.value != null) {
        this.recaptcha = result.value;
        useLocalStorage('recaptcha_data', result.value);
      } else {
        this.recaptcha = {};
      }
      return this.recaptcha;
    },
  },

  persist: true,
});
