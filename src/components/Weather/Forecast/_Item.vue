<template>
  <div class="u-panel flex items-center w-full py-4 gap-x-4">
    <div class="space-y-2 text-center">
      <WeatherIcon
        :code="iconData.code"
        :is-day="iconData.isDay"
        class="w-5 h-5 mx-auto"
      />
      <div class="text-xs">
        US: <span v-float>{{ forecastData.uv }}</span>
      </div>
    </div>
    <div class="text-center flex-auto">
      <TempText :temp="temp" />
      <div class="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
        {{ forecastData.condition.text }}
      </div>
    </div>
    <div class="text-center space-y-2 text-sm">
      <WindyText :wind="wind" />
      <WindyDirection
        class="flex gap-x-1 items-center"
        :wind_dir="forecastData.wind_dir"
      >
        <template #icon="{ classes }">
          <VueFontAwesome
            icon="fa-light fa-location-arrow"
            class="w-4 h-4"
            :class="classes"
          />
        </template>
        <template #text="{ text }">
          <div
            class="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-center"
          >
            {{ text }}
          </div>
        </template>
      </WindyDirection>
    </div>
    <div>
      {{ time }}
    </div>
  </div>
</template>
<script>
import TempText from "../Temp/TempText.vue";
import WindyText from "../Windy/WindyText.vue";
import WeatherIcon from "../__Icons/WeatherIcon.vue";
import WindyDirection from "../Windy/WindyDirection.vue";
export default {
  components: {
    TempText,
    WindyText,
    WeatherIcon,
    WindyDirection,
  },
  props: {
    forecastData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    temp() {
      if (this.forecastData) {
        const data = {
          temp_c: this.forecastData.temp_c,
          temp_f: this.forecastData.temp_f,
        };
        return data;
      }
      return {};
    },
    wind() {
      if (this.forecastData) {
        const data = {
          wind_kph: this.forecastData.wind_kph,
          wind_mph: this.forecastData.wind_mph,
        };
        return data;
      }
      return {};
    },
    time() {
      if (this.forecastData) {
        return this.moment(this.forecastData.time_epoch * 1000).format("HH:mm");
      }
      return "";
    },
    iconData() {
      if (this.forecastData) {
        const data = {
          code: this.forecastData.condition.code,
          isDay: this.forecastData.is_day ? true : false,
        };
        return data;
      }
      return {};
    },
  },
};
</script>
