<template>
  <div class="u-panel text-sm">
    <div class="flex gap-x-5 items-center">
      <div class="flex-none w-14 space-y-2 text-center">
        <WeatherIcon
          v-if="currentWeather"
          :code="currentWeather.condition.code"
          :is-day="currentWeather.is_day ? true : false"
          class="mx-auto"
        />
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
    <AirOverview :air-data="currentAirQuality" />
  </div>
</template>
<script>
import TempText from "./Temp/TempText.vue";
import AirOverview from "./AirQuality/ItemOverview.vue";
import WeatherIcon from "./__Icons/WeatherIcon.vue";
export default {
  components: {
    WeatherIcon,
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
