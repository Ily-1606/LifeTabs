import { axiosWeatherAPI } from "~/utils/axios";
const weatherStore = {
  namespaced: true,
  state() {
    return {
      astronomy: {},
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
        const res = await axiosWeatherAPI.get("/astronomy.json", {
          params: {
            q,
            dt: currentDate,
            ...params,
          },
        });
        const astronomyFetch = res.data.astronomy;
        return astronomyFetch;
      };
      return await this.dispatch("getFromStorage", {
        key: "astronomy",
        module: "weather",
        timeOut: TIME_OUT,
        callback,
      });
    },
  },
};
export default weatherStore;
