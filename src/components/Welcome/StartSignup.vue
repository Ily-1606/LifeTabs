<template>
  <div>
    <div class="w-[400px] border rounded-md p-4 shadow-xl bg-white">
      <div class="text-center text-lg">Bước cuối cùng...</div>
      <div class="text-center text-xs">
        Chuyển đổi tài khoản để đồng bộ hóa cấu hình của bạn...
      </div>
      <div class="w-full space-y-10 my-8">
        <MakodaInput
          id="email"
          custom-placeholder="Email"
          v-model="email"
          :errors="v$.email.$errors"
        />
        <MakodaInput
          id="password"
          type="password"
          v-model="password"
          custom-placeholder="Mật khẩu"
          :errors="v$.password.$errors"
        />
        <MakodaInput
          id="re-password"
          type="password"
          v-model="rePassword"
          custom-placeholder="Nhập lại mật khẩu"
          :errors="v$.rePassword.$errors"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <button class="btn-blue text-sm" @click="$emit('next')">Bỏ qua</button>
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-1"
          :duration="200"
        >
          <button
            class="btn-green text-sm"
            v-if="isShowBtnContinue"
            @click="handlerNext"
          >
            Tiếp tục
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, sameAs } from "@vuelidate/validators";
import MakodaInput from "~/components/Input/MakodaInput.vue";
export default {
  components: {
    MakodaInput,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
    };
  },
  computed: {
    isShowBtnContinue() {
      return this.email || this.password || this.rePassword;
    },
  },
  methods: {
    async handlerNext() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.$emit("next", {
        email: this.email,
        password: this.password,
        rePassword: this.rePassword,
      });
    },
  },
  validations() {
    return {
      email: this.password || this.rePassword ? { email, required } : { email },
      password: this.email || this.rePassword ? { required } : {},
      rePassword:
        this.email || this.password
          ? { required, samePassword: sameAs(this.password) }
          : {},
    };
  },
};
</script>
