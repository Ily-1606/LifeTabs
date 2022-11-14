import { axiosApi as axiosWeatherAPI } from "~/utils/axios";
const weatherStore = {
  namespaced: true,
  state() {
    return {
      astronomy: {},
      currentWeather: {},
      listLocations: [],
      locationActivating: null,
    };
  },
  actions: {
    async addLocation(context, { payload, params }) {
      const res = await axiosWeatherAPI.post("/user/location", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async updateLocation(context, { payload, params }) {
      const res = await axiosWeatherAPI.patch("/user/location", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async fetchLocations(context, { params = {} } = {}) {
      const res = await axiosWeatherAPI.get("/user/config", {
        params,
      });
      const dataServer = res.data;
      if (dataServer.data) {
        this.commit("setStorageVsStore", {
          key: "listLocations",
          value: dataServer.data.location.locations,
          module: "weather",
        });
        this.commit("setStorageVsStore", {
          key: "locationActivating",
          value: dataServer.data.location.current_setting,
          module: "weather",
        });
      }
      return dataServer;
    },
    async getLocation() {
      const locations = await this.getters.getStorage("userLocation");
      let q = "";
      if (locations?.value) {
        const coords = locations.value;
        q = [coords.latitude, coords.longitude].toString();
      }
      return q;
    },
    async getAstronomy(context, params = {}) {
      const date = new Date();
      const currentDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const q = await context.dispatch("getLocation");
      const res = await axiosWeatherAPI.get("/weather/astronomy", {
        params: {
          q,
          dt: currentDate,
          ...params,
        },
      });
      const dataServer = res.data;
      if (dataServer.success) {
        this.commit("setStorageVsStore", {
          key: "astronomy",
          value: dataServer.data.astronomy,
          module: "weather",
        });
        return dataServer.data.astronomy;
      }
    },
    async getCurrentWeather(context, params = {}) {
      const date = new Date();
      const currentDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const q = await context.dispatch("getLocation");
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
        this.commit("setStorageVsStore", {
          key: "currentWeather",
          value: dataServer.data,
          module: "weather",
        });
        return dataServer.data;
      }
    },
    async getForecastWeather(context, params = {}) {
      const days = "5";
      const q = await context.dispatch("getLocation");
      const res = await axiosWeatherAPI.get("/weather/forecast", {
        params: {
          q,
          days,
          ...params,
        },
      });
      const dataServer = res.data;
      if (dataServer.success) {
        this.commit("setStorageVsStore", {
          key: "forecastData",
          value: dataServer.data,
          module: "weather",
        });
        return dataServer.data;
      }
    },
    async searchLocation(context, params = {}) {
      const res = await axiosWeatherAPI.get("/weather/location-search", {
        params,
      });
      const dataServer = res.data;
      if (dataServer.success) {
        return dataServer.data;
      }
    },
    async getAstronomyCache({ rootState, dispatch }, params = {}) {
      const TIME_OUT = rootState.timeOutAstronomy;
      return await this.dispatch("getFromStorage", {
        key: "astronomy",
        module: "weather",
        timeOut: TIME_OUT,
        callback: () => dispatch("getAstronomy", params),
      });
    },
    async getCurrentWeatherCache({ rootState, dispatch }, { params } = {}) {
      const TIME_OUT = rootState.timeOutFetchCurrentWeather;
      return await this.dispatch("getFromStorage", {
        key: "currentWeather",
        module: "weather",
        timeOut: TIME_OUT,
        callback: () => dispatch("getCurrentWeather", params),
      });
    },
    async getForecastCache({ rootState, dispatch }, { params } = {}) {
      const TIME_OUT = rootState.timeOutFetchForecastWeather;
      return await this.dispatch("getFromStorage", {
        key: "forecastData",
        module: "weather",
        timeOut: TIME_OUT,
        callback: () => dispatch("getForecastWeather", params),
      });
    },
  },
};
export default weatherStore;
