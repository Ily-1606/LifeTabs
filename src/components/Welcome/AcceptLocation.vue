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
      <div class="flex justify-center items-center mt-4">
        <button class="btn-green" @click="$emit('next')">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import WeatherLottie from "~/assets/lottie/lf20_3PNLts.json?url";
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
    };
  },
};
</script>
