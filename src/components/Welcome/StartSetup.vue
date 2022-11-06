<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Bước cuối cùng...</div>
      <div class="h-60 mx-auto">
        <lottie-player
          :src="SetupLottie"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="text-center">
        Chúng tôi đang kết nối với máy chủ để lấy một số thông tin cần thiết...
      </div>
      <div class="flex justify-center items-center mt-4"></div>
    </div>
  </div>
</template>
<script>
import SetupLottie from "~/assets/lottie/97798-loading.json?url";
export default {
  data() {
    return {
      SetupLottie,
    };
  },
  methods: {
    async createUser() {
      const res = await this.$store.dispatch("signup");
      if (res.success) {
        this.getAccessToken({
          uuid: res.data.user.uuid,
        }).then((res) => {
          const token = res.data.token;
          if (token) {
            this.$store.commit("set", {
              key: "userToken",
              value: token,
              setStorage: true,
            });
            setTimeout(() => {
              this.$router.push({
                name: "home",
              });
            }, 5000);
          }
        });
      }
    },
    async initData() {
      await this.createUser();
    },
    async getAccessToken(data) {
      const res = await this.$store.dispatch("login", {
        data,
      });
      return res;
    },
  },
  created() {
    this.initData();
  },
};
</script>
