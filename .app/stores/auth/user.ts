import {createPinia, defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {useUser} from '~/composables/auth/user';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// function isNotEmpty(x: any) {
//   for (const p in x) return !0;
//   return !1
// };

export const useUserStore = defineStore('user', {
  state: () => ({
    signup: useLocalStorage('signup_data', {}),
    signin: useLocalStorage('signin_data', {
      // "role_id": 0,
      // "company_id": 0,
      // "is_two_factor_enabled": 0,
      // "token": ""
    }),

    me: useLocalStorage('me_data', {}),
    us: useLocalStorage('us_data', {}),
    profile_image: useLocalStorage('profile_image_data', {}),
    add_or_update_profile_image: useLocalStorage('add_or_update_profile_image_data', {}),
    update_me: useLocalStorage('update_me_data', {}),
    user_state: useLocalStorage('user_state_data', {}),
    update_user_state: useLocalStorage('update_user_state_data', {}),
    check_email_exist: useLocalStorage('check_email_exist_data', {}),
    verify_email: useLocalStorage('verify_email_data', {}),
    send_verification_email: useLocalStorage('send_verification_email_data', {}),
    validate_token: useLocalStorage('validate_token_data', {}),
    signout: useLocalStorage('signout_data', {}),
    add: useLocalStorage('add_data', {}),
    edit: useLocalStorage('edit_data', {}),
    remove: useLocalStorage('remove_data', {}),
    reinstate: useLocalStorage('reinstate_data', {}),
    read: useLocalStorage('read_data', {}),
    list: useLocalStorage('list_data', {}),
  }),

  getters: {
    getSignup: (state) => {
      return state.signup;
    },

    getSignin: (state) => {
      return state.signin;
    },

    getMe: (state) => {
      return state.me;
    },

    getUs: (state) => {
      return state.us;
    },

    getProfileImage: (state) => {
      return state.profile_image;
    },

    getAddOrUpdateProfileImage: (state) => {
      return state.add_or_update_profile_image;
    },

    getUpdateMe: (state) => {
      return state.update_me;
    },

    getUserState: (state) => {
      return state.user_state;
    },

    getUpdateUserState: (state) => {
      return state.update_user_state;
    },

    getCheckEmailExist: (state) => {
      return state.check_email_exist;
    },

    getVerifyEmail: (state) => {
      return state.verify_email;
    },

    getSendVerificationEmail: (state) => {
      return state.send_verification_email;
    },

    getValidateToken: (state) => {
      return state.validate_token;
    },

    getSignout: (state) => {
      return state.signout;
    },

    getAdd: (state) => {
      return state.add;
    },

    getEdit: (state) => {
      return state.edit;
    },

    getRemove: (state) => {
      return state.remove;
    },

    getReinstate: (state) => {
      return state.reinstate;
    },

    getRead: (state) => {
      return state.read;
    },

    getList: (state) => {
      return state.list;
    },
  },

  actions: {
    async setSignup(payload: any) {
      const {signup} = useUser();
      const result = await signup(payload);
      if (result.value != null) {
        this.signup = result.value;
        useLocalStorage('signup_data', result.value);
      } else {
        this.signup = {};
      }
      return this.signup;
    },

    async setSignin(payload: any) {
      const {signin} = useUser();
      const result = await signin(payload);
      if (result.value!= null) {
        this.signin = result.value;
        useLocalStorage('signin_data', result.value);
      } else {
        this.signin = {
          "role_id": 0,
          "company_id": 0,
          "is_two_factor_enabled": 0,
          "token": ""
        };
      }
      return this.signin;
    },

    async setMe(payload: any) {
      const {me} = useUser();
      const result = await me(payload);
      if (result.value!= null) {
        this.me = result.value;
        useLocalStorage('me_data', result.value);
      } else {
        this.me = {};
      }
      return this.me;
    },

    async setUs(payload: any) {
      const {us} = useUser();
      const result = await us(payload);
      if (result.value != null) {
        this.us = result.value;
        useLocalStorage('us_data', result.value);
      } else {
        this.us = {};
      }
      console.log(` this.us: ${JSON.stringify( this.us, null, 2)}`);
      return this.us;
    },

    async setProfileImage(payload: any) {
      const {profileImage} = useUser();
      const result = await profileImage(payload);
      if (result.value != null) {
        this.profile_image = result.value;
        useLocalStorage('profile_image_data', result.value);
      } else {
        this.profile_image = {};
      }
      return this.profile_image;
    },

    async setAddOrUpdateProfileImage(payload: any) {
      const {addOrUpdateProfileImage} = useUser();
      const result = await addOrUpdateProfileImage(payload);
      if (result.value != null) {
        this.add_or_update_profile_image = result.value;
        useLocalStorage('add_or_update_profile_image_data', result.value);
      } else {
        this.add_or_update_profile_image = {};
      }
      return this.add_or_update_profile_image;
    },

    async setUpdateMe(payload: any) {
      const {update_me} = useUser();
      const result = await update_me(payload);
      if (result.value != null) {
        this.update_me = result.value;
        useLocalStorage('update_me_data', result.value);
      } else {
        this.update_me = {};
      }
      return this.update_me;
    },

    async setUserState(payload: any) {
      const {user_state} = useUser();
      const result = await user_state(payload);
      if (result.value != null) {
        this.user_state = result.value;
        useLocalStorage('user_state_data', result.value);
      } else {
        this.user_state = {};
      }
      return this.user_state;
    },

    async setUpdateUserState(payload: any) {
      const {update_user_state} = useUser();
      const result = await update_user_state(payload);
      if (result.value != null) {
        this.update_user_state = result.value;
        useLocalStorage('update_user_state_data', result.value);
      } else {
        this.update_user_state = {};
      }
      return this.update_user_state;
    },

    async setCheckEmailExist(payload: any) {
      const {check_email_exist} = useUser();
      const result = await check_email_exist(payload);
      if (result.value != null) {
        this.check_email_exist = result.value;
        useLocalStorage('check_email_exist_data', result.value);
      } else {
        this.check_email_exist = {};
      }
      return this.check_email_exist;
    },

    async setVerifyEmail(payload: any) {
      const {verify_email} = useUser();
      const result = await verify_email(payload);
      if (result.value != null) {
        this.verify_email = result.value;
        useLocalStorage('verify_email_data', result.value);
      } else {
        this.verify_email = {};
      }
      return this.verify_email;
    },

    async setSendVerificationEmail(payload: any) {
      const {send_verification_email} = useUser();
      const result = await send_verification_email(payload);
      if (result.value != null) {
        this.verify_email = result.value;
        useLocalStorage('send_verification_email_data', result.value);
      } else {
        this.verify_email = {};
      }
      return this.verify_email;
    },

    async setValidateToken(payload: any) {
      const {validate_token} = useUser();
      const result = await validate_token(payload);
      if (result.value != null) {
        this.validate_token = result.value;
        useLocalStorage('validate_token_data', result.value);
      } else {
        this.validate_token = {};
      }
      return this.validate_token;
    },

    async setSignout(payload: any) {
      const {signout} = useUser();
      const result = await signout(payload);
      if (result.value != null) {
        this.signout = result.value;
        useLocalStorage('signout_data', result.value);
      } else {
        this.signout = {};
      }
      return this.signout;
    },

    async setAdd(payload: any) {
      const {add} = useUser();
      const result = await add(payload);
      if (result.value != null) {
        this.add = result.value;
        useLocalStorage('add_data', result.value);
      } else {
        this.add = {};
      }
      return this.add;
    },

    async setEdit(payload: any) {
      const {edit} = useUser();
      const result = await edit(payload);
      if (result.value != null) {
        this.edit = result.value;
        useLocalStorage('edit_data', result.value);
      } else {
        this.edit = {};
      }
      return this.edit;
    },

    async setRemove(payload: any) {
      const {remove} = useUser();
      const result = await remove(payload);
      if (result.value != null) {
        this.remove = result.value;
        useLocalStorage('remove_data', result.value);
      } else {
        this.remove = {};
      }
      return this.remove;
    },

    async setReinstate(payload: any) {
      const {reinstate} = useUser();
      const result = await reinstate(payload);
      if (result.value != null) {
        this.reinstate = result.value;
        useLocalStorage('reinstate_data', result.value);
      } else {
        this.reinstate = {};
      }
      return this.reinstate;
    },

    async setRead(payload: any) {
      const {read} = useUser();
      const result = await read(payload);
      if (result.value != null) {
        this.read = result.value;
        useLocalStorage('read_data', result.value);
      } else {
        this.read = {};
      }
      return this.read;
    },

    async setList(payload: any) {
      const {list} = useUser();
      const result = await list(payload);
      if (result.value != null) {
        this.list = result.value;
        useLocalStorage('list_data', result.value);
      } else {
        this.list = {};
      }
      return this.list;
    },
  },
   persist: true,
});
