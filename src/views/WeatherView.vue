<template>
  <div>
    <div class="min-h-screen min-w-screen flex px-6 justify-between">
      <div
        class="flex flex-col flex-none w-[350px] space-y-8 h-screen py-6 overflow-hidden sticky top-0"
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
      <div class="flex-auto max-w-[600px] space-y-10 py-6 pb-[100px]">
        <div class="flex justify-around items-center">
          <div class="flex-none">
            <VueFontAwesome
              icon="fa-light fa-plus"
              class="w-4 h-4 p-2 box-content border border-blue-500 rounded-md"
              @click="isOpenModalLocation = true"
            />
          </div>
          <div class="flex-auto text-center space-y-3">
            <div class="text-2xl">
              {{ currentLocation.name }}
            </div>
            <div class="flex gap-x-3 items-center justify-center">
              <VueFontAwesome
                icon="fa-light fa-rotate-right"
                class="w-4 h-4 cursor-pointer"
                :class="{
                  'animate-spin pointer-events-none': isLoadingWeather,
                }"
                @click="reloadData"
              />
              <div class="text-sm">
                Cập nhật lần cuối {{ loadedAgo }} phút trước
              </div>
            </div>
          </div>
          <div class="flex-none">
            <VueFontAwesome
              icon="fa-light fa-gear"
              class="w-4 h-4 p-2 box-content border border-blue-500 rounded-md"
            />
          </div>
        </div>
        <div class="text-center space-y-2">
          <WeatherIcon
            v-if="currentWeather?.condition"
            class="w-20 h-20 m-auto"
            :code="currentWeather.condition?.code"
            :is-day="currentWeather.is_day ? true : false"
          />
          <div class="text-sm">{{ currentWeather?.condition?.text }}</div>
          <TempText :temp="currentTemp" class="text-xl" />
        </div>
        <div class="space-y-2">
          <div>Trong những ngày tới</div>
          <GraphWeather />
        </div>
      </div>
      <div class="flex-none w-[350px] space-y-6 py-6 sticky top-0 h-screen">
        <ItemObjectRise />
        <DetailPanel />
        <DetailPanelMore />
      </div>
    </div>
    <ModalLocation
      v-if="isOpenModalLocation"
      :is-open="true"
      @close-modal="isOpenModalLocation = false"
    />
  </div>
</template>

<script>
import ItemObjectRise from "~/components/Weather/ItemObjectRise.vue";
import geoLocation from "~/utils/geolocation";
import AirInformation from "~/components/Weather/AirQuality/AirInformation.vue";
import ForecastOverView from "~/components/Weather/Forecast/ItemOverView.vue";
import DetailPanel from "~/components/Weather/DetailPanel/DetailPanel.vue";
import DetailPanelMore from "~/components/Weather/DetailPanel/DetailPanelMore.vue";
import WeatherIcon from "~/components/Weather/__Icons/WeatherIcon.vue";
import { minuteAgo } from "~/utils/event";
import TempText from "~/components/Weather/Temp/TempText.vue";
import GraphWeather from "~/components/Weather/DetailPanel/GraphWeather.vue";
import ModalLocation from "~/components/Modal/ModalLocation.vue";
export default {
  name: "WeatherView",
  components: {
    AirInformation,
    ItemObjectRise,
    ForecastOverView,
    DetailPanel,
    DetailPanelMore,
    WeatherIcon,
    TempText,
    GraphWeather,
    ModalLocation,
  },
  data() {
    return {
      loadedAgo: 1,
      timmerAgoId: null,
      isLoadingWeather: false,
      isOpenModalLocation: false,
    };
  },
  computed: {
    currentLocation() {
      return (
        this.$store.getters.get("currentWeather", "weather")?.location ?? {}
      );
    },
    currentWeather() {
      return (
        this.$store.getters.get("currentWeather", "weather")?.current ?? {}
      );
    },
    currentTemp() {
      return {
        temp_c: this.currentWeather.temp_c,
        temp_f: this.currentWeather.temp_f,
      };
    },
    lastLoad() {
      return this.$store.getters.getTimeCached("currentWeather", "weather");
    },
  },
  methods: {
    async getData() {
      this.$store.dispatch("weather/getCacheData");
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
      const handlers = this.$store.dispatch("weather/refreshData");
      handlers.then(() => {
        // Handler all process done
        this.isLoadingWeather = false;
      });
    },
  },
  created() {
    this.getData();
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
