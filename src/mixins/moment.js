export default {
  methods: {
    convertAM2Date(timeAM) {
      const date = this.moment(timeAM, ["h:mm A"]);
      return date;
    },
    convertAM2FullTime(timeAM) {
      const time = this.convertAM2Date(timeAM).format("HH:mm");
      return time;
    },
  },
};
