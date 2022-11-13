<template>
  <div
    class="flex items-center border border-blue-400 px-4 py-3 rounded-2xl justify-center w-20 box-content"
    v-if="isLoading"
  >
    <VueFontAwesome
      icon="fa-solid fa-spinner-third"
      class="w-6 h-6 fill-blue-500 cursor-pointer animate-spin"
    />
  </div>
  <div
    class="flex items-center border border-green-400 px-4 py-3 rounded-2xl text-sm gap-x-3"
    v-else
  >
    <div class="flex-none">
      <VueFontAwesome
        icon="fa-light fa-location-check"
        class="w-4 h-4 fill-green-500"
      />
    </div>
    <div class="flex-none">
      {{ dataLocation.name }}
    </div>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  promiseData: {
    type: Promise,
    required: false,
  },
});
const dataLocation = ref({});
const isLoading = ref(true);
props.promiseData.then((res) => {
  isLoading.value = false;
  dataLocation.value = res[0];
});
</script>
