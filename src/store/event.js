import { axiosApi } from "~/utils/axios";
import solarLunar from "solarlunar";
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
            let dateObj = new Date();
            if (!event.full_date) {
              const [date, month] = event.date.split("/");
              dateObj.setMonth(month - 1, date);
              dateObj.setHours(0, 0);
            } else {
              dateObj = new Date(event.full_date);
            }
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
    async addEvent(context, { payload = {}, params = {} } = {}) {
      const res = await axiosApi.post("/event", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async updateEvent(context, { payload = {}, params = {} } = {}) {
      const res = await axiosApi.patch("/event", payload, {
        params,
      });
      const dataServer = res.data;
      return dataServer;
    },
    async deleteEvent(context, { params = {} } = {}) {
      const res = await axiosApi.delete("/event", {
        params,
      });
      const dataServer = res.data;
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
