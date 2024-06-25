import { useFetch } from '@vueuse/core';
export function useRecurringExpense() {

  const config = useRuntimeConfig();
  const baseURL=config.public.coreApi;

  async function list(payload: any){
    const endpoint=baseURL+'/recurring-expense/list';
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
    const endpoint=baseURL+'/recurring-expense/read';
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
    const endpoint=baseURL+'/recurring-expense/add';
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
    const endpoint=baseURL+'/recurring-expense/edit';
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
    const endpoint=baseURL+'/recurring-expense/remove';
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
    const endpoint=baseURL+'/recurring-expense/reinstate';
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
    const endpoint=baseURL+'/recurring-expense/vital';
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
    const endpoint=baseURL+'/recurring-expense/import';
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
    const endpoint=baseURL+'/recurring-expense/export';
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
