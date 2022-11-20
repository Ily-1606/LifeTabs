import { axiosApi } from "~/utils/axios";
import solarLunar from "solarLunar";
const eventStore = {
  namespaced: true,
  state() {
    return {
      events: [],
      nextEvent: {},
    };
  },
  actions: {
    async getEvents(context, { params = {} } = {}) {
      const res = await axiosApi.get("/event", {
        params,
      });
      const dataServer = res.data;
      if (dataServer.success) {
        const value = dataServer.data
          .map((event) => {
            const dateObj = new Date();
            const [date, month] = event.date.split("/");
            dateObj.setMonth(month - 1, date);
            let next_date = dateObj;
            if (event.type_time === 0) {
              const year = dateObj.getFullYear();
              const month = dateObj.getMonth() + 1;
              const date = dateObj.getDate();
              const lunarDate = solarLunar.lunar2solar(year, month, date);
              next_date.setFullYear(
                lunarDate.cYear,
                lunarDate.cMonth - 1,
                lunarDate.cDay
              );
            }
            event.next_time = next_date.getTime();
            return event;
          })
          .sort((a, b) => {
            if (a.next_time < b.next_time) {
              return -1;
            }
            if (a.next_time > b.next_time) {
              return 1;
            }
            return 0;
          });
        const currentTime = new Date().getTime();
        const nextEvent = value.find((_) => {
          return _.next_time > currentTime;
        });
        this.commit("setStorageVsStore", {
          key: "events",
          value,
          module: "event",
        });
        this.commit("setStorageVsStore", {
          key: "nextEvent",
          value: nextEvent,
          module: "event",
        });
        return dataServer.data;
      }
      return dataServer;
    },
    async getEventCached({ rootState, dispatch }, { params } = {}) {
      const TIME_OUT = rootState.timeOutFetchEvent;
      this.dispatch("getFromStorage", {
        key: "nextEvent",
        module: "event",
        timeOut: TIME_OUT,
        callback: () => {},
      });
      return await this.dispatch("getFromStorage", {
        key: "events",
        module: "event",
        timeOut: TIME_OUT,
        callback: () => dispatch("getEvents", params),
      });
    },
  },
};

export default eventStore;
