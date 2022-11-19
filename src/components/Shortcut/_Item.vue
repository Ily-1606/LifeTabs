<template>
  <div @click.prevent="navigation" class="space-y-1 cursor-pointer">
    <div class="mx-auto">
      <template v-if="props.data.icon">
        <VueFontAwesome
          :icon="props.data.icon"
          class="w-6 h-6 rounded-lg mx-auto"
        />
      </template>
      <template v-else>
        <img
          :src="`${BASE_STORAGE_URL}/${props.data.imageUrl}`"
          class="w-6 h-6 rounded-lg mx-auto"
        />
      </template>
    </div>
    <div
      class="text-center w-16 text-ellipsis overflow-hidden whitespace-nowrap"
      :title="props.data.name"
    >
      {{ props.data.name }}
    </div>
  </div>
</template>
<script setup>
import shortcut from "~/mixins/shortcut";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
const router = useRouter();
const routerBinding = {
  $router: router,
};
const BASE_STORAGE_URL = ref(import.meta.env.VITE_APP_BASE_STORAGE);
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        imageUrl: "",
        name: "",
        action: () => {},
        url: "",
      };
    },
    required: true,
  },
});
const navigation = () => {
  if (props.data.action) {
    const func = shortcut.methods[props.data.action];
    if (func) func.call(routerBinding);
    return;
  }
  if (props.data.url) {
    window.open(props.data.url, "_blank");
    return;
  }
};
</script>
