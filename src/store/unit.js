export default {
  state() {
    return {
      /**
       *  // Temperature: c || f
       *  // Windy: kph (km/h) || mph (Mile/h)
       *  // pressure: mb (Pressure in millibars) || in (Pressure in inches)
       *  // precip: mm (Precipitation amount in millimeters) || in (Precipitation amount in inches)
       */
      unit: {
        temp: "c",
        windy: "kph",
        pressure: "in",
        precip: "mm",
      },
    };
  },
  namespaced: true,
};
