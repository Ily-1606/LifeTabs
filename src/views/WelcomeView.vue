<template>
  <div
    class="min-h-screen min-w-screen bg-wave bg-no-repeat bg-bottom flex items-center justify-center text-base"
  >
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Rất vui khi được gặp bạn.</div>
      <div class="w-24 mx-auto">
        <lottie-player
          :src="lottieWelcome"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="text-center">
        Cảm ơn bạn đã sử dụng tiện ích mở rộng, sau đây chúng tôi có một số
        hướng dẫn cho bạn.
      </div>
      <div class="flex justify-center items-center mt-4">
        <button class="btn-green">Tiếp tục</button>
      </div>
    </div>
  </div>
</template>
<script>
import lottieWelcome from "~/assets/lottie/122990-smile-circle.json?url";
export default {
  data() {
    return {
      lottieWelcome,
    };
  },
};
</script>
