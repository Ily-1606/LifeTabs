<template>
  <UModal
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
    :dialog-class="['max-w-md']"
  >
    <template #header>Bạn chắc chắn rằng sẽ xóa lối tắt này?</template>
    <template #body>
      <div class="my-6">
        <p class="text-red-500">
          Chúng tôi sẽ xóa lối tắt này trên máy chủ đám mây.
        </p>
        <p>Bạn chắc chắn muốn xóa?</p>
      </div>
    </template>
    <template #footer>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Hủy bỏ
        </button>
        <button
          class="inline-flex items-center gap-x-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:btn-blue-300 disabled:text-blue-500"
          form="formShortcut"
          :disabled="isLoading"
          @click.prevent="submit"
        >
          <VueFontAwesome
            v-if="isLoading"
            icon="fa-solid fa-spinner-third"
            class="w-4 h-4 fill-blue-500 cursor-pointer animate-spin"
          />
          Xác nhận
        </button>
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";
export default {
  components: {
    UModal,
  },
  mixins: [UModal],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
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
      this.isLoading = true;
      this.$store
        .dispatch("shortcut/deleteShortcut", {
          params: {
            id: this.formData.id,
          },
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
  created() {
    this.formData = {
      ...this.data,
    };
  },
};
</script>
