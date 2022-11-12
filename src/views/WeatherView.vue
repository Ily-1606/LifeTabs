<template>
  <div>
    <div class="min-h-screen h-screen min-w-screen flex p-6 justify-between">
      <div
        class="flex flex-col flex-none w-[350px] space-y-8 h-full overflow-hidden"
      >
        <div class="flex-none">
          <AirInformation />
        </div>
        <div class="flex-auto flex flex-col overflow-hidden">
          <div class="mb-2">Những giờ tiếp theo</div>
          <div class="flex-auto space-y-4 overflow-auto">
            <ForecastOverView />
          </div>
        </div>
      </div>
      <div class="flex-auto max-w-[600px]">
        <div class="text-center space-y-3">
          <div class="text-xl">
            {{ currentLocation.name }}
          </div>
          <div class="flex gap-x-3 items-center justify-center">
            <VueFontAwesome
              icon="fa-light fa-rotate-right"
              class="w-4 h-4 cursor-pointer"
              :class="{ 'animate-spin pointer-events-none': isLoadingWeather }"
              @click="reloadData"
            />
            <div class="text-sm">
              Cập nhật lần cuối {{ loadedAgo }} phút trước
            </div>
          </div>
        </div>
      </div>
      <div class="flex-none w-[350px] space-y-6">
        <ItemObjectRise />
        <DetailPanel />
        <DetailPanelMore />
      </div>
    </div>
  </div>
</template>

<script>
import ItemObjectRise from "~/components/Weather/ItemObjectRise.vue";
import geoLocation from "~/utils/geolocation";
import AirInformation from "~/components/Weather/AirQuality/AirInformation.vue";
import ForecastOverView from "~/components/Weather/Forecast/ItemOverView.vue";
import DetailPanel from "~/components/Weather/DetailPanel/DetailPanel.vue";
import DetailPanelMore from "~/components/Weather/DetailPanel/DetailPanelMore.vue";
import { minuteAgo } from "~/utils/event";
export default {
  name: "WeatherView",
  components: {
    AirInformation,
    ItemObjectRise,
    ForecastOverView,
    DetailPanel,
    DetailPanelMore,
  },
  data() {
    return {
      loadedAgo: 1,
      timmerAgoId: null,
      isLoadingWeather: false,
    };
  },
  computed: {
    currentLocation() {
      return (
        this.$store.getters.get("currentWeather", "weather")?.location ?? {}
      );
    },
    lastLoad() {
      return this.$store.getters.getTimeCached("currentWeather", "weather");
    },
  },
  methods: {
    async getCurrentAstronomy() {
      this.$store.dispatch("weather/getAstronomyCache");
    },
    async getCurrentWeather() {
      this.$store.dispatch("weather/getCurrentWeatherCache");
    },
    async getForecast() {
      this.$store.dispatch("weather/getForecastCache");
    },
    reloadLocation() {
      geoLocation.query().then((coords) => {
        if (coords) {
          this.$store.commit("set", {
            key: "userLocation",
            value: coords,
            setStorage: true,
          });
        }
      });
    },
    loadAgo() {
      if (this.lastLoad) {
        this.loadedAgo = minuteAgo(this.lastLoad, new Date().getTime());
      }
    },
    reloadData() {
      this.isLoadingWeather = true;
      const handlers = [
        this.$store.dispatch("weather/getAstronomy"),
        this.$store.dispatch("weather/getCurrentWeather"),
        this.$store.dispatch("weather/getForecastWeather"),
      ];
      Promise.all(handlers).then(() => {
        // Handler all process done
        this.isLoadingWeather = false;
      });
    },
  },
  created() {
    this.getCurrentAstronomy();
    this.getCurrentWeather();
    this.getForecast();
    this.reloadLocation();
    this.loadAgo();
    this.timmerAgoId = setInterval(() => {
      this.loadAgo();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timmerAgoId);
  },
};
</script>
