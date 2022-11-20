const eventStore = {
  namespaced: true,
  state() {
    return {
      listEvents: [
        {
          name: "Sinh nhật PingPong",
          next_time: new Date().getTime() + 1000 * 60 * 24 * 2, // 2 days
          created_at: new Date().getTime(),
        },
      ],
    };
  },
  actions: {},
};

export default eventStore;
