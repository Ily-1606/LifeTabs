<template>
  <div>
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
      <div class="flex justify-between items-center mt-8">
        <button class="btn-blue" @click="$emit('back')">{{ btnBack }}</button>
        <button class="btn-green" @click="$emit('next')">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import lottieWelcome from "~/assets/lottie/122990-smile-circle.json?url";
export default {
  props: {
    btnText: {
      type: String,
      required: true,
    },
    btnBack: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lottieWelcome,
    };
  },
};
</script>
