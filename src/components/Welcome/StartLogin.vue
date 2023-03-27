<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Chào mừng bạn trở lại...</div>
      <div class="text-center text-xs">
        Đồng bộ tiến trình của ứng dụng từ máy khác...
      </div>
      <div class="w-full space-y-10 my-8">
        <MakodaInput id="email" custom-placeholder="Email" v-model="email" />
        <MakodaInput
          id="password"
          type="password"
          v-model="password"
          custom-placeholder="Mật khẩu"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <button class="btn-blue text-sm py-2" @click="$emit('back')">
          Chưa có tài khoản
        </button>
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-1"
          :duration="200"
        >
          <button
            class="btn-green text-sm inline-flex items-center py-2 gap-x-3 justify-center disabled:bg-green-300 disabled:text-green-500"
            v-if="isShowBtnContinue"
            @click="login"
            :disabled="isSigning"
          >
            <VueFontAwesome
              v-if="isSigning"
              icon="fa-solid fa-spinner-third"
              class="w-4 h-4 fill-green-500 cursor-pointer animate-spin"
            />
            Đăng nhập
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import MakodaInput from "~/components/Input/MakodaInput.vue";
import { handleHTTPException } from "~/utils/toastification";
export default {
  components: {
    MakodaInput,
  },
  data() {
    return {
      email: "",
      password: "",
      isSigning: false,
    };
  },
  computed: {
    isShowBtnContinue() {
      return this.email && this.password;
    },
  },
  methods: {
    async login() {
      this.isSigning = true;
      try {
        const res = await this.$store.dispatch("login", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        if (res.data.token) {
          this.handlerNext(res.data.token);
        }
      } catch (e) {
        handleHTTPException(e);
        throw e;
      } finally {
        this.isSigning = false;
      }
    },
    async handlerNext(token) {
      this.$emit("next", {
        token,
      });
    },
  },
};
</script>
