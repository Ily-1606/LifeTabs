<template>
  <UModal
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
    :dialog-class="['max-w-md']"
  >
    <template #header>Chỉnh sửa</template>
    <template #body>
      <div class="py-8 space-y-6">
        <div>
          <slot name="message" />
        </div>
        <div>
          <slot name="optionSound" />
        </div>
      </div>
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
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";

export default {
  mixins: [UModal],
  components: {
    UModal,
  },
  data() {
    return {};
  },
};
</script>
