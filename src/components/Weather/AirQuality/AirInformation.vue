<template>
  <div class="u-panel space-y-3">
    <ItemOverview :air-data="currentAirQuality" />
    <div class="flex gap-x-4 justify-center">
      <div
        v-for="(air, index) in airsCalculated"
        :key="index"
        class="text-center space-y-2"
        :class="air.theme"
      >
        <div class="uppercase">{{ air.name }}</div>
        <div>
          {{ air.point }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { calcAQI, getRangeAIQ } from "~/utils/weather/aqi.js";
import ItemOverview from "./ItemOverview.vue";
export default {
  components: {
    ItemOverview,
  },
  data() {
    return {
      listConditions: {
        co: "co",
        no2: "no2",
        o3: "o3",
        pm2_5: "pm2.5",
        pm10: "pm10",
        so2: "so2",
      },
    };
  },
  computed: {
    currentWeather() {
      const dataWeather = this.$store.getters.get("currentWeather", "weather");
      if (dataWeather) {
        return dataWeather.current;
      }
      return {};
    },
    currentAirQuality() {
      if (this.currentWeather) {
        return this.currentWeather.air_quality;
      }
      return {};
    },
    airsCalculated() {
      const result = [];
      for (let airKey in this.listConditions) {
        const point = this.calcAQI(airKey, this.currentAirQuality[airKey]);
        const theme = this.getThemeAir(point);
        result.push({
          airKey,
          name: this.listConditions[airKey],
          point,
          theme,
        });
      }
      return result;
    },
  },
  methods: {
    calcAQI(key, value) {
      let valueFormatted = value;
      const listToPPM = ["co"];
      listToPPM.forEach((_) => {
        if (key === _) valueFormatted /= 1000;
      });
      return calcAQI({ key, value: valueFormatted });
    },
    getThemeAir(value) {
      const index = getRangeAIQ(value);
      if (index === 0) return "text-green-500";
      else if (index === 1) return "text-orange-400";
      else if (index === 2) return "text-orange-800";
      else if (index === 3) return "text-red-500";
      else if (index === 5) return "text-red-900";
    },
  },
};
</script>
