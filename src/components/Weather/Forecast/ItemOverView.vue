<template>
  <div class="w-full space-y-2">
    <Item
      v-for="(forecast, index) in nextForecastHours"
      :key="index"
      :forecastData="forecast"
    />
  </div>
</template>
<script>
import Item from "./_Item.vue";
export default {
  components: {
    Item,
  },
  computed: {
    forecastData() {
      return this.$store.getters.get("forecastData", "weather")?.forecast;
    },
    forecastHours() {
      return this.forecastData?.forecastday[0].hour || [];
    },
    nextForecastHours() {
      const now = new Date().getTime();
      return this.forecastHours.filter(({ time_epoch }) => {
        return time_epoch * 1000 > now;
      });
    },
  },
};
</script>
