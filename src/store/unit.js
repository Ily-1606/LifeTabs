export default {
  state() {
    return {
      /**
       *  // Temperature: c || f
       *  // Windy: kph (km/h) || mph (Mile/h)
       */
      temp: "c",
      windy: "kph",
    };
  },
  namespaced: true,
};
