<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Quản lý các trang web bạn truy cập</div>
      <div class="w-60 mx-auto my-4">
        <lottie-player
          :src="NetWorkSecurityLottie"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="text-center">
        Chúng tôi sẽ ngăn chặn bạn truy cập bạn vào một số trang web khi bạn
        đang sử dụng tính năng "hỗ trợ tập trung".
      </div>
      <div class="flex justify-center items-center mt-4">
        <button class="btn-green" @click="$emit('next')">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import NetWorkSecurityLottie from "~/assets/lottie/93112-security.json?url";
export default {
  props: {
    btnText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      NetWorkSecurityLottie,
    };
  },
};
</script>
