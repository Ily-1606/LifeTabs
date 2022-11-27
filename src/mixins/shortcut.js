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
    toShortcut() {
      this.$router.push({
        name: "shortcut",
      });
    },
    toEvent() {
      this.$router.push({
        name: "event",
      });
    },
    toFocus() {
      this.$router.push({
        name: "focus",
      });
    },
  },
};
