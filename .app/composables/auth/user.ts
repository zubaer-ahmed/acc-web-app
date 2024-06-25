import { useFetch } from '@vueuse/core';
export function useUser() {

  const config = useRuntimeConfig();
  const authWeb=config.public.authWeb;
  const authURL=config.public.authApi;
  const app_auth_uid=config.public.app_auth_uid;

  async function signup(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/signup';
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
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function signin(payload: any){
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
        const endpoint=authURL+'/auth/user/signin';
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
                //SET COOKIE
                cookie.value.role_id = result.value.data.role_id;
                cookie.value.company_id = result.value.data.company_id;
                cookie.value.is_two_factor_enabled = result.value.data.is_two_factor_enabled;
                cookie.value.token = result.value.data.token;
              }
            }
          }
        }
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function signout(payload: any){
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
        const endpoint=authURL+'/auth/user/signout';
        const { isFetching, error, data } =
          await useFetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+cookie.value.token,
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
                //UNSET COOKIE
                cookie.value=undefined
              }
            }
          }
        }
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };


  async function profileImage(payload: any){
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
        const endpoint=authURL+'/auth/user/profile-image';
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
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };
  async function addOrUpdateProfileImage(payload: any){
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
        const endpoint=authURL+'/auth/user/add-or-update-profile-image';
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
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };
  async function us(payload: any){
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
        const endpoint=authURL+'/auth/user/us';
        const { isFetching, error, data } =
          await useFetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set your desired headers here
              'Authorization': 'Bearer '+cookie.value.token,
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
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };


  async function me(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/me';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function update_me(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/update-me';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function user_state(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/user-state';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function update_user_state(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/update-user-state';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function check_email_exist(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/check-email-exist';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function verify_email(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/verify-email';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function send_verification_email(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/send-verification-email';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function validate_token(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/validate-token';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function add(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/add-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function edit(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/edit-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function remove(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/remove-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function reinstate(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/reinstate-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function read(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/read-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  async function list(payload: any){
    let result=ref({});
    try {
      const cookie=useCookie('cookie')
      if(cookie?.value!==undefined){
        const appPayload = {
          ...payload,
          "session-id": cookie?.value?.session_id,
          "client-ip": cookie?.value?.client_ip,
          "app_uid": app_auth_uid,
          "locale": 1,
          "app_url": "https://www.accomium.co",
        };
        const endpoint=authURL+'/auth/user/list-user';
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
      }else{
        result.value = { cookie: "Session is missing." };
      }
    } catch (error) {
      useBugsnag().notify('Some Error')
    }
    return result;
  };

  return {
    signup,
    signin,
    me,
    update_me,
    user_state,
    update_user_state,
    check_email_exist,
    verify_email,
    send_verification_email,
    validate_token,
    signout,
    add,
    edit,
    remove,
    reinstate,
    read,
    list,
    us,
    profileImage,
    addOrUpdateProfileImage

  }
}
