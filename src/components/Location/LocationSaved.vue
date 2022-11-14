<template>
  <div
    class="flex items-center border border-blue-400 px-4 py-3 rounded-2xl justify-center w-20 box-content cursor-pointer"
    v-if="isLoading"
  >
    <VueFontAwesome
      icon="fa-solid fa-spinner-third"
      class="w-6 h-6 fill-blue-500 cursor-pointer animate-spin"
    />
  </div>
  <div
    class="flex items-center border px-4 py-3 rounded-2xl text-sm gap-x-3 cursor-pointer"
    @click="emits('selected', dataLocation.id)"
    :class="
      locationActivating === dataLocation.id ||
      (!locationActivating && dataLocation.isGps)
        ? 'border-green-400 fill-green-500'
        : 'border-blue-500 fill-blue-500'
    "
    v-else
  >
    <div class="flex-none">
      <VueFontAwesome icon="fa-light fa-location-check" class="w-4 h-4" />
    </div>
    <div class="flex-none">
      {{ dataLocation.name }}
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();
const locationActivating = computed(() => {
  return store.getters.get("locationActivating", "weather")?.location.id;
});
const props = defineProps({
  promiseData: {
    type: [Promise, Object],
    required: false,
  },
});
const emits = defineEmits(["selected"]);
const dataLocation = ref({});
const isLoading = ref(true);
if (props.promiseData.constructor === Promise) {
  props.promiseData.then((res) => {
    isLoading.value = false;
    dataLocation.value = res.location;
  });
} else {
  isLoading.value = false;
  dataLocation.value = reactive(props.promiseData.location);
}
</script>
