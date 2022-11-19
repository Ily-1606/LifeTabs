<template>
  <UModal
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
    :dialog-class="['max-w-md']"
  >
    <template #header> Thêm lối tắt </template>
    <template #body>
      <form @submit.prevent="submit" id="formShortcut">
        <div class="my-8 space-y-10">
          <MakodaInput
            custom-placeholder="Tên lối tắt"
            v-model="formData.name"
            :errors="v$.formData.name.$errors"
          />
          <MakodaInput
            custom-placeholder="URL lối tắt"
            v-model="formData.url"
            :errors="v$.formData.url.$errors"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Đóng
        </button>
        <button
          class="inline-flex items-center gap-x-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:btn-blue-300 disabled:text-blue-500"
          form="formShortcut"
          :disabled="isLoading"
        >
          <VueFontAwesome
            v-if="isLoading"
            icon="fa-solid fa-spinner-third"
            class="w-4 h-4 fill-blue-500 cursor-pointer animate-spin"
          />
          Hoàn tất
        </button>
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";
import { required, url } from "@vuelidate/validators";
import MakodaInput from "../Input/MakodaInput.vue";
import { useVuelidate } from "@vuelidate/core";
export default {
  components: {
    UModal,
    MakodaInput,
  },
  mixins: [UModal],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      isLoading: false,
      formData: {
        name: "",
        url: "",
      },
    };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.isLoading = true;
      this.$store
        .dispatch("shortcut/addShortcut", {
          payload: this.formData,
        })
        .then(() => {
          this.$store.dispatch("shortcut/getShortcut");
          this.$emit("closeModal");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {},
  validations() {
    return {
      formData: {
        name: { required },
        url: { required, url },
      },
    };
  },
};
</script>
