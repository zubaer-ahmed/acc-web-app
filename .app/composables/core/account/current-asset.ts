import { useFetch } from '@vueuse/core';
export function useCurrentAsset() {

  const config = useRuntimeConfig();
  const baseURL=config.public.coreApi;

  async function list(payload: any){
    const endpoint=baseURL+'/current-asset/list';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const listObject=data.value.data.original.data;
        if(status==200){
          return listObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function read(payload: any){
    const endpoint=baseURL+'/current-asset/read';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const readObject=data.value.data.original.data;
        if(status==200){
          return readObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function add(payload: any){
    const endpoint=baseURL+'/current-asset/add';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();

    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const addObject=data.value.data.original.data;
        if(status==200){
          return addObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function edit(payload: any){
    const endpoint=baseURL+'/current-asset/edit';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const editObject=data.value.data.original.data;
        if(status==200){
          return editObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function remove(payload: any){
    const endpoint=baseURL+'/current-asset/remove';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const removeObject=data.value.data.original.data;
        if(status==200){
          return removeObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function reinstate(payload: any){
    const endpoint=baseURL+'/current-asset/reinstate';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const reinstateObject=data.value.data.original.data;
        if(status==200){
          return reinstateObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function vital(payload: any){
    const endpoint=baseURL+'/current-asset/vital';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const vitalObject=data.value.data.original.data;
        if(status==200){
          return vitalObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function load(payload: any){
    const endpoint=baseURL+'/current-asset/import';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const loadObject=data.value.data.original.data;
        if(status==200){
          return loadObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  async function unload(payload: any){
    const endpoint=baseURL+'/current-asset/export';
    const { isFetching, error, data } = await useFetch(endpoint).post(payload).json();
    if(!error.value){
      if(data.value && data.value.length!=0){
        const status=data.value.data.original.status;
        const unloadObject=data.value.data.original.data;
        if(status==200){
          return unloadObject;
        }else{
          return null;
        }
      }else{
        return null;
      }
    }else{
      return null;
    }
  };

  return {
    add,
    edit,
    remove,
    reinstate,
    read,
    list,
    vital,
    load,
    unload
  }
}
