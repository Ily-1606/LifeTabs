export default {
  methods: {
    toWeather() {
      this.$router.push({
        name: "weather",
      });
    },
    toNewTab() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
