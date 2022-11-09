<template>
  <div class="space-y-6 border border-blue-500 rounded-xl p-6 w-full text-sm">
    <div class="flex gap-x-5 items-center">
      <div class="flex-none w-14 space-y-2 text-center">
        <cloudsIcon class="mx-auto" />
        <div class="text-ellipsis overflow-hidden whitespace-nowrap">
          {{ currentLocation?.name }}
        </div>
      </div>
      <div class="flex-auto space-y-1">
        <TempText :temp="currentTemp" />
        <div class="text-ellipsis overflow-hidden whitespace-nowrap">
          {{ currentWeather?.condition.text }}
        </div>
      </div>
    </div>
    <AirOverview
      class="flex gap-x-5 items-center"
      :air-data="currentAirQuality"
    />
  </div>
</template>
<script>
import cloudsIcon from "./__Icons/__Clouds.vue";
import TempText from "./Temp/TempText.vue";
import AirOverview from "./AirQuality/ItemOverview.vue";
export default {
  components: {
    cloudsIcon,
    TempText,
    AirOverview,
  },
  computed: {
    dataWeather() {
      return this.$store.getters.get("currentWeather", "weather");
    },
    currentLocation() {
      if (this.dataWeather) {
        return this.dataWeather.location;
      }
      return "";
    },
    currentWeather() {
      if (this.dataWeather) {
        return this.dataWeather.current;
      }
      return {};
    },
    currentTemp() {
      if (this.currentWeather) {
        const { temp_c, temp_f } = this.currentWeather;
        return { temp_c, temp_f };
      }
      return {};
    },
    currentAirQuality() {
      if (this.currentWeather) {
        return this.currentWeather.air_quality;
      }
      return {};
    },
  },
};
</script>
