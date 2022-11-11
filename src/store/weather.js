import { axiosApi as axiosWeatherAPI } from "~/utils/axios";
const weatherStore = {
  namespaced: true,
  state() {
    return {
      astronomy: {},
      currentWeather: {},
    };
  },
  actions: {
    async getAstronomy({ rootState }, params = {}) {
      const TIME_OUT = rootState.timeOutAstronomy;
      const locations = await this.getters.getStorage("userLocation");
      let q = "";
      if (locations?.value) {
        const coords = locations.value;
        q = [coords.latitude, coords.longitude].toString();
      }
      const callback = async () => {
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const res = await axiosWeatherAPI.get("/weather/astronomy", {
          params: {
            q,
            dt: currentDate,
            ...params,
          },
        });
        const dataServer = res.data;
        if (dataServer.success) {
          return dataServer.data.astronomy;
        }
      };
      return await this.dispatch("getFromStorage", {
        key: "astronomy",
        module: "weather",
        timeOut: TIME_OUT,
        callback,
      });
    },
    async getCurrentWeather({ rootState }, { params } = {}) {
      const TIME_OUT = rootState.timeOutFetchCurrentWeather;
      const locations = await this.getters.getStorage("userLocation");
      let q = "";
      if (locations?.value) {
        const coords = locations.value;
        q = [coords.latitude, coords.longitude].toString();
      }
      const callback = async () => {
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const res = await axiosWeatherAPI.get("/weather/current", {
          params: {
            q,
            dt: currentDate,
            aqi: "yes",
            alerts: "yes",
            ...params,
          },
        });
        const dataServer = res.data;
        if (dataServer.success) {
          return dataServer.data;
        }
      };
      return await this.dispatch("getFromStorage", {
        key: "currentWeather",
        module: "weather",
        timeOut: TIME_OUT,
        callback,
      });
    },
  },
};
export default weatherStore;
