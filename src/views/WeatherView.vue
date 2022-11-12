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
      <div class="flex-auto max-w-[600px]"></div>
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
export default {
  name: "WeatherView",
  components: {
    AirInformation,
    ItemObjectRise,
    ForecastOverView,
    DetailPanel,
    DetailPanelMore,
  },
  methods: {
    async fetchShare() {
      this.$store.dispatch("fetchShare");
    },
    async getCurrentAstronomy() {
      this.$store.dispatch("weather/getAstronomy");
    },
    async getCurrentWeather() {
      this.$store.dispatch("weather/getCurrentWeather");
    },
    async getForecast() {
      this.$store.dispatch("weather/getForecast");
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
  },
  created() {
    this.fetchShare();
    this.getCurrentAstronomy();
    this.getCurrentWeather();
    this.getForecast();
    this.reloadLocation();
  },
};
</script>
