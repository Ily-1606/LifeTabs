<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Dịch vụ vị trí</div>
      <div class="h-60 mx-auto">
        <lottie-player
          :src="WeatherLottie"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="text-center">
        Chúng tôi cần sử dụng dịch vụ vị trí của bạn để dự báo thời tiết cho bạn
        theo thời gian thực.
      </div>
      <div class="text-center text-red-500 font-bold my-3">
        {{ messageBlockLocation }}
      </div>
      <div class="flex justify-center items-center mt-4">
        <button
          class="btn-green disabled:bg-green-300 flex items-center gap-x-2"
          @click="$emit('next')"
          :disabled="isDisabled"
        >
          <VueFontAwesome
            class="w-4 h-4 animate-spin fill-white"
            icon="fa-solid fa-spinner-third"
            v-if="isWaiting"
          />
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import WeatherLottie from "~/assets/lottie/lf20_3PNLts.json?url";
import geoLocation from "~/utils/geolocation";
export default {
  props: {
    btnText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      WeatherLottie,
      isDisabled: true,
      messageBlockLocation: "",
      isWaiting: false,
    };
  },
  methods: {
    getUserLocation() {
      this.isWaiting = true;
      geoLocation
        .query()
        .then((coords) => {
          if (coords) {
            this.isDisabled = false;
            this.$store.commit("set", {
              key: "userLocation",
              value: coords,
              setStorage: true,
            });
            return;
          }
          this.isDisabled = true;
          this.messageBlockLocation =
            "Vui lòng cho phép dịch vụ vị trí để sử dụng.";
        })
        .finally(() => {
          this.isWaiting = false;
        });
    },
    requestLocationPermission() {
      geoLocation.setup().then((res) => {
        if (res.state === "granted") {
          this.isDisabled = false;
          this.getUserLocation();
        } else if (res.state === "prompt") {
          this.getUserLocation();
        } else {
          this.isDisabled = true;
          this.messageBlockLocation =
            "Vui lòng cho phép dịch vụ vị trí để sử dụng.";
        }
      });
    },
  },
  created() {
    this.requestLocationPermission();
  },
};
</script>
