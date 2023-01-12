import axiosApi from "../utils/axios";
import { createStore } from "vuex";
import weatherStore from "./weather";
import shortCutStore from "./shortcut";
import unitStore from "./unit";
import eventStore from "./event";

export default createStore({
  state: {
    userInfo: {},
    timeOutAstronomy: 1000 * 60 * 15,
    timeOutFetchShare: 1000 * 60 * 15,
    timeOutFetchCurrentWeather: 1000 * 60 * 15,
    timeOutFetchForecastWeather: 1000 * 60 * 15,
    timeOutFetchShortcut: 1000 * 60 * 15,
    timeOutFetchEvent: 1000 * 60 * 15,
  },
  getters: {
    get: (state) => (key, module) => {
      if (module) {
        if (state[module][key]?.value !== undefined) {
          return state[module][key].value;
        }
        return state[module][key];
      }
      if (state[key]?.value !== undefined) {
        return state[key].value;
      }
      return state[key];
    },
    getStorage: () => (key) => {
      if (chrome?.storage) {
        return chrome.storage.local.get([key]).then((data) => data[key]);
      } else {
        return new Promise((solver) => {
          const data = localStorage.getItem(key);
          /**
           * //TODO Try to parse data string to json
           */
          try {
            const jsonData = JSON.parse(data);
            solver(jsonData);
          } catch (e) {
            solver(data);
          }
        });
      }
    },
    getTimeCached: (state) => (key, module) => {
      if (module) return state[module][key]?.updated_at;
      return state[key]?.updated_at;
    },
  },
  mutations: {
    set(state, { key, value, module = null, setStorage = false }) {
      if (module) state[module][key] = value;
      else state[key] = value;
      if (setStorage) {
        this.commit("setStorage", { key, value });
      }
    },
    setStorage(context, { key, value }) {
      if (chrome?.storage) {
        const payload = {};
        payload[key] = {
          updated_at: new Date().getTime(),
          value,
        };
        chrome.storage.local.set(payload);
      } else {
        localStorage.setItem(
          key,
          JSON.stringify({
            updated_at: new Date().getTime(),
            value,
          })
        );
      }
    },
    setStorageVsStore(state, { key, value, module = null }) {
      this.commit("set", {
        key,
        value: {
          updated_at: new Date().getTime(),
          value,
        },
        module,
      });
      this.commit("setStorage", { key, value });
    },
  },
  actions: {
    isTimeOutChecker(
      context,
      { currentTime = new Date().getTime(), markTime, timeOut }
    ) {
      return currentTime > markTime + timeOut;
    },
    async signup(context, { data }) {
      const res = await axiosApi.post("/user/signup", data);
      return res.data;
    },
    async getUserInfo(context, { params }) {
      const res = await axiosApi.get("/user", {
        params,
      });
      return res.data;
    },
    async login(context, { params, data } = {}) {
      const res = await axiosApi.post("/user/login", data, {
        params,
      });
      return res.data;
    },
    async fetchShare({ state, commit }, { params } = {}) {
      const TIME_OUT = state.timeOutFetchShare;
      const callback = async () => {
        const res = await axiosApi.get("/share/today", {
          params,
        });
        const { data } = res.data;
        commit("setStorageVsStore", {
          key: "listShares",
          value: data,
        });
        return data;
      };
      return await this.dispatch("getFromStorage", {
        key: "listShares",
        timeOut: TIME_OUT,
        callback,
      });
    },
    async getNotification(context, data) {
      return await axiosApi.post("/user/subscriber", data);
    },
    async getFromStorage(context, { key, module, timeOut, callback }) {
      let needReload = true;
      const data = await context.getters.getStorage(key);
      if (data) {
        const TIME_OUT = timeOut;
        const isTimeOut = await context.dispatch("isTimeOutChecker", {
          markTime: data.updated_at,
          timeOut: TIME_OUT,
        });
        if (!isTimeOut) needReload = false;
        context.commit("set", {
          key,
          value: data,
          module,
        });
      }
      if (needReload) {
        callback();
      }
      return data?.value;
    },
  },
  modules: {
    weather: weatherStore,
    shortcut: shortCutStore,
    unit: unitStore,
    event: eventStore,
  },
});
