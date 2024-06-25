import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core';
import {useBankAdjustment} from '@/composables/core/bank/bank-adjustment';

function isNotEmpty(x: any) {
  for (const p in x) return !0;
  return !1
};

export const useBankAdjustmentStore = defineStore('bank-adjustment', {
  state: () => ({
    add: useLocalStorage('add_data', {}),
    edit: useLocalStorage('edit_data', {}),
    remove: useLocalStorage('remove_data', {}),
    reinstate: useLocalStorage('reinstate_data', {}),
    read: useLocalStorage('read_data', {}),
    list: useLocalStorage('list_data', {}),
    vital: useLocalStorage('vital_data', {}),
    import: useLocalStorage('import_data', {}),
    export: useLocalStorage('export_data', {}),
  }),

  getters: {
    getList: (state) => {
      return state.list;
    },
    getRead: (state) => {
      return state.read;
    },
  },

  actions: {
    async setAdd(payload: any) {
      const {add} = useBankAdjustment();
      const result = await add(payload);
      if (result != null) {
        this.add = result;
        useLocalStorage('add_data', result);
      } else {
        this.add = {};
      }
      return this.add;
    },

    async setEdit(payload: any) {
      const {edit} = useBankAdjustment();
      const result = await edit(payload);
      if (result != null) {
        this.edit = result;
        useLocalStorage('edit_data', result);
      } else {
        this.edit = {};
      }
      return this.edit;
    },

    async setRemove(payload: any) {
      const {remove} = useBankAdjustment();
      const result = await remove(payload);
      if (result != null) {
        this.remove = result;
        useLocalStorage('remove_data', result);
      } else {
        this.remove = {};
      }
      return this.remove;
    },

    async setReinstate(payload: any) {
      const {reinstate} = useBankAdjustment();
      const result = await reinstate(payload);
      if (result != null) {
        this.reinstate = result;
        useLocalStorage('reinstate_data', result);
      } else {
        this.reinstate = {};
      }
      return this.reinstate;
    },
    async setRead(payload: any) {
      const {read} = useBankAdjustment();
      const result = await read(payload);
      if (result != null) {
        this.read = result;
        useLocalStorage('read_data', result);
      } else {
        this.read = {};
      }
      return this.read;
    },
    async setList(payload: any) {
      const {list} = useBankAdjustment();
      const result = await list(payload);
      if (result != null) {
        this.list = result;
        useLocalStorage('list_data', result);
      } else {
        this.list = {};
      }
      return this.list;
    },
    async setVital(payload: any) {
      const {vital} = useBankAdjustment();
      const result = await vital(payload);
      if (result != null) {
        this.vital = result;
        useLocalStorage('vital_data', result);
      } else {
        this.vital = {};
      }
      return this.vital;
    },

    async setImport(payload: any) {
      const {load} = useBankAdjustment();
      const result = await load(payload);
      if (result != null) {
        this.import = result;
        useLocalStorage('import_data', result);
      } else {
        this.import = {};
      }
      return this.import;
    },

    async setExport(payload: any) {
      const {unload} = useBankAdjustment();
      const result = await unload(payload);
      if (result != null) {
        this.export = result;
        useLocalStorage('export_data', result);
      } else {
        this.export = {};
      }
      return this.export;
    }
  }
});
