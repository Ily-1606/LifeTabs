<template>
  <div>
    <div class="min-h-screen h-screen min-w-screen flex p-6 justify-between">
      <div
        class="flex flex-col flex-none min-w-[300px] space-y-8 h-full overflow-hidden"
      >
        <div class="flex-none">
          <EventNear />
        </div>
        <div class="flex-auto flex flex-col overflow-hidden">
          <div class="mb-2">Cổ phiếu</div>
          <div class="flex-auto space-y-4 overflow-auto">
            <ShareItem
              v-for="(share, index) in listShares"
              :key="index"
              :share-info="share"
            />
          </div>
        </div>
      </div>
      <div class="flex-auto max-w-[600px]">
        <div class="mx-auto my-6">
          <InfoLess />
        </div>
        <div class="text-xl text-center my-6">Chúc một ngày tốt lành.</div>
        <div class="my-6">
          <div class="text-lg my-4">Mail</div>
          <MailOverView />
        </div>
        <div class="my-6">
          <div class="text-lg my-4">Thể thao</div>
          <SportOverView />
        </div>
        <div class="my-6">
          <div class="text-lg my-4">Giải trí</div>
          <MediaOverView />
        </div>
      </div>
      <div class="flex-none w-[350px] space-y-6">
        <WeatherItemOverview />
        <ItemObjectRise />
      </div>
    </div>
  </div>
</template>

<script>
import EventNear from "~/components/Event/EventNear.vue";
import ShareItem from "~/components/Share/ShareItem.vue";
import InfoLess from "~/components/Profile/InfoLess.vue";
import WeatherItemOverview from "~/components/Weather/ItemOverview.vue";
import ItemObjectRise from "~/components/Weather/ItemObjectRise.vue";
import MailOverView from "~/components/Mail/OverView.vue";
import SportOverView from "~/components/Sport/OverView.vue";
import MediaOverView from "~/components/Media/OverView.vue";
import geoLocation from "~/utils/geolocation";

export default {
  name: "HomeView",
  components: {
    EventNear,
    ShareItem,
    InfoLess,
    WeatherItemOverview,
    ItemObjectRise,
    MailOverView,
    SportOverView,
    MediaOverView,
  },
  computed: {
    listShares() {
      return this.$store.getters.get("listShares");
    },
  },
  methods: {
    async fetchShare() {
      this.$store.dispatch("fetchShare");
    },
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
  },
  created() {
    this.fetchShare();
    this.getData();
    this.reloadLocation();
  },
};
</script>
