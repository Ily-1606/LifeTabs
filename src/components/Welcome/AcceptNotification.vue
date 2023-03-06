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
        <button class="btn-green" @click="handlerNext">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import sw from "~/utils/sw.js";
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
      subscription: "",
    };
  },
  created() {
    sw.subscribeUser = sw.subscribeUser.bind(sw, (subscription) => {
      this.subscription = JSON.parse(JSON.stringify(subscription));
    });
    sw.active.call(sw);
  },
  methods: {
    async handlerNext() {
      if (this.subscription) {
        this.$emit("next", { subscription: this.subscription });
      }
    },
  },
};
</script>
