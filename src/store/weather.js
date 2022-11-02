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
      const callback = async () => {
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const res = await axiosWeatherAPI.get("/astronomy.json", {
          params: {
            q: "DaNang",
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
