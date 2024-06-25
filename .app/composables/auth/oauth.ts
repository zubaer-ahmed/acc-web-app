import {useFetch} from "@vueuse/core";

export function useOAuth() {

  const config = useRuntimeConfig();
  const authWeb=config.public.authWeb;
  const authURL=config.public.authApi;
  const app_auth_uid=config.public.app_auth_uid;

  async function redirect(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
        };
        const endpoint=authURL+'/auth/oauth/google/redirect';
        const { isFetching, error, data } =
          await useFetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set your desired headers here
            },
            body: JSON.stringify(appPayload),
          }).json();
        if(!error.value){
          if(data.value && data.value.length!=0){
            if(data.value.code!==undefined && data.value.message!==undefined && data.value.traceId!==undefined){
              result.value = { notification: data.value };
            }else{
              const status=data.value.data.original.status;
              const res=data.value.data.original.data;
              if(status==200){
                result.value = { data: res };
              }
            }
          }
        }
      }
    } catch (error) {}
    return result;
  };

  async function callback(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      const response = await $fetch(authWeb);
      cookie.value = response?.data?.original?.data;
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
        };

        const endpoint=authURL+'/auth/oauth/google/callback';
        // const endpoint=' https://accomium.co/auth/oauth/google-callback';

        const { isFetching, error, data } =
          await useFetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set your desired headers here
            },
            body: JSON.stringify(appPayload),
          }).json();
        if(!error.value){
          if(data.value && data.value.length!=0){
            if(data.value.code!==undefined && data.value.message!==undefined && data.value.traceId!==undefined){
              result.value = { notification: data.value };
            }else{
              const status=data.value.data.original.status;
              const res=data.value.data.original.data;
              if(status==200){
                result.value = { data: res };
              }
            }
          }
        }
      }
    } catch (error) {}
    return result.value;
  };
  return {
    redirect,
    callback,
  }
};


