import axiosApi from "../utils/axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {},
  },
  getters: {
    get: (state) => (key) => state[key],
  },
  mutations: {
    setToken(context, payload) {
      if (chrome?.storage) {
        chrome.storage.local.set(payload);
      } else {
        localStorage.setItem("userToken", payload["userToken"]);
      }
    },
  },
  actions: {
    async signup(context, data) {
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
  },
  modules: {},
});
