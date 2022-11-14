<template>
  <UModal :is-open="isOpen" @close-modal="$emit('closeModal')">
    <template #header> Thêm địa điểm </template>
    <template #body>
      <div class="my-4">
        <div
          class="flex border-blue-400 rounded-md border pr-4 pl-2 items-center"
        >
          <div class="flex-auto">
            <form @submit.prevent="search" class="w-full">
              <input
                class="outline-none border-none py-2 text-sm placeholder:text-blue-600 w-full"
                placeholder="Nhập tên, zipcode,..."
                v-model="q"
              />
            </form>
          </div>
          <div class="flex-none">
            <VueFontAwesome
              :icon="
                isLoading
                  ? 'fa-solid fa-spinner-third'
                  : 'fa-light fa-magnifying-glass'
              "
              class="w-4 h-4 fill-blue-500 cursor-pointer"
              :class="{ 'animate-spin': isLoading }"
              @click="search"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-4" v-auto-animate>
        <LocationSaved
          v-for="(locationSaved, index) in listSaved"
          :key="index"
          :promise-data="locationSaved"
          @selected="changeLocation"
        />
      </div>
      <div class="flex flex-wrap gap-4 my-4">
        <template v-if="listSearch.length">
          <div
            class=""
            v-for="(locationData, index) in listSearch"
            :key="index"
          >
            <LocationItem
              :location-data="locationData"
              @selected="saveLocation"
            />
          </div>
        </template>
        <template v-else>
          <div class="flex-auto text-center mt-2 mb-6">
            Hãy thử tìm kiếm địa điểm xung quanh...
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Đóng
        </button>
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Hoàn tất
        </button>
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";
import LocationItem from "../Location/LocationItem.vue";
import LocationSaved from "../Location/LocationSaved.vue";
export default {
  components: {
    UModal,
    LocationItem,
    LocationSaved,
  },
  mixins: [UModal],
  data() {
    return {
      q: "",
      isLoading: false,
      listSearch: [],
      currentLocation: [],
      listAdded: [],
    };
  },
  computed: {
    listSaved() {
      const listLocations = this.$store.getters.get("listLocations", "weather");
      if (listLocations) {
        return [...this.currentLocation, ...listLocations, ...this.listAdded];
      }
      return [this.currentLocation];
    },
  },
  methods: {
    async search() {
      if (this.q && !this.isLoading) {
        this.isLoading = true;
        const res = await this.$store.dispatch("weather/searchLocation", {
          q: this.q,
        });
        this.listSearch = res;
        this.isLoading = false;
      }
    },
    fetchSaved() {
      const handler = new Promise((solver) => {
        this.$store.dispatch("weather/getLocation").then((locationGps) => {
          this.$store
            .dispatch("weather/searchLocation", {
              q: locationGps,
            })
            .then((res) => {
              res[0].isGps = true;
              return res[0];
            })
            .then((res) => {
              solver({
                location: res,
              });
            });
        });
      });
      this.currentLocation = [handler];
    },
    async saveLocation(data) {
      const res = this.$store.dispatch("weather/addLocation", {
        payload: {
          location: data,
        },
      });
      this.listAdded.push(res.then((res) => res.data));
    },
    async getLocation() {
      await this.$store.dispatch("weather/fetchLocations");
    },
    async changeLocation(locationId) {
      const location = this.listSaved.find((locationData) => {
        if (locationData.id) {
          return locationData.location.id === locationId;
        }
        return false;
      });
      await this.$store.dispatch("weather/updateLocation", {
        params: {
          id: location.id,
        },
        payload: {
          isActivating: true,
        },
      });
      this.listAdded = [];
      this.getLocation();
    },
  },
  created() {
    this.fetchSaved();
    this.getLocation();
  },
};
</script>
