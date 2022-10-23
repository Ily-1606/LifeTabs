<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Dịch vụ thông báo</div>
      <div class="h-60 mx-auto my-4">
        <lottie-player
          :src="CalendarLottie"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="text-center">
        Chúng tôi cần sử dụng dịch vụ thông báo để thực hiện một số tác vụ nhắc
        nhở.
      </div>
      <div class="flex justify-center items-center mt-4">
        <button class="btn-green" @click="$emit('next')">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarLottie from "~/assets/lottie/lf20_98vgucqb.json?url";
export default {
  props: {
    btnText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      CalendarLottie,
    };
  },
};
</script>
