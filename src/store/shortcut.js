import { axiosApi } from "~/utils/axios";

const shortCutStore = {
  namespaced: true,
  state() {
    return {
      /**
       * Author: Ily1606
       * The list of shortcuts "base" (can't delete by user)
       * String: name: The name to displaying
       * String: action: The method to be called when user clicking into shortcut (load in @/mixins/shortcut.js)
       * String: icon: The icon to be loaded by vue fontawesome pro
       */
      baseShortcut: [
        {
          name: "taskbar.icons.home",
          action: "toNewTab",
          icon: "fa-light fa-house-user",
          routerName: "home",
        },
        {
          name: "taskbar.icons.weather",
          action: "toWeather",
          icon: "fa-light fa-cloud-sun-rain",
          routerName: "weather",
        },
        {
          name: "taskbar.icons.event",
          action: "toEvent",
          icon: "fa-light fa-calendar",
          routerName: "event",
        },
        {
          name: "taskbar.icons.shortcut",
          action: "toShortcut",
          icon: "fa-light fa-keyboard",
          routerName: "shortcut",
        },
        {
          name: "taskbar.icons.setting",
          action: "toSetting",
          icon: "fa-light fa-gear",
        },
      ],
      shortcuts: [],
    };
  },
  getters: {},
  actions: {
    async addShortcut(context, { payload = {}, params = {} } = {}) {
      const res = await axiosApi.post("/shortcut", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async editShortcut(context, { payload = {}, params = {} } = {}) {
      const res = await axiosApi.patch("/shortcut", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async pinShortcut(context, { params = {} } = {}) {
      const res = await context.dispatch("editShortcut", {
        payload: {
          isPin: true,
        },
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async unPinShortcut(context, { params = {} } = {}) {
      const res = await context.dispatch("editShortcut", {
        payload: {
          isPin: false,
        },
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async deleteShortcut(context, { params = {} } = {}) {
      const res = await axiosApi.delete("/shortcut", {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async getShortcut(context, { params = {} } = {}) {
      const res = await axiosApi.get("/shortcut", {
        params,
      });
      const dataServer = res.data;
      if (dataServer.success) {
        this.commit("setStorageVsStore", {
          key: "shortcuts",
          value: dataServer.data,
          module: "shortcut",
        });
        return dataServer.data;
      }
      return dataServer;
    },
    async getShortcutCached({ rootState, dispatch }, { params } = {}) {
      const TIME_OUT = rootState.timeOutFetchShortcut;
      return await this.dispatch("getFromStorage", {
        key: "shortcuts",
        module: "shortcut",
        timeOut: TIME_OUT,
        callback: () => dispatch("getShortcut", params),
      });
    },
  },
};
export default shortCutStore;
