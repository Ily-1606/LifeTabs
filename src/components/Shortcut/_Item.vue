<template>
  <div class="relative">
    <div
      class="space-y-1 cursor-pointer"
      :class="{ 'animate-wiggle': isShowOption }"
      ref="shortcutItem"
    >
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
    <transition
      leave-to-class="opacity-0 transition-all duration-[300ms]"
      enter-from-class="opacity-0 transition-all duration-[300ms]"
      enter-to-class="opacity-1 transition-all duration-[300ms]"
      :duration="300"
    >
      <div
        class="absolute outline-none z-10"
        :class="{ 'bottom-full': isTop }"
        v-show="isShowOption"
        @focusout="isShowOption = false"
        tabindex="-1"
        ref="popup"
      >
        <div
          class="relative py-3 px-5 rounded-lg bg-slate-200/50 backdrop-blur-md shadow-md"
        >
          <VueFontAwesome
            :icon="isTop ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'"
            class="w-6 h-6 absolute fill-slate-200"
            :class="
              isTop ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'
            "
          />
          <div>{{ props.data.name }}</div>
          <div class="flex gap-x-4 text-sm mt-3 items-center">
            <div
              class="flex-auto flex items-center gap-x-2 fill-blue-400 text-blue-500"
            >
              <VueFontAwesome icon="fa-light fa-pencil" class="w-4 h-4" />
              <div class="whitespace-nowrap overflow-hidden">Chỉnh sửa</div>
            </div>
            <div
              class="flex-auto flex items-center gap-x-2 fill-red-400 text-red-500"
            >
              <VueFontAwesome icon="fa-light fa-trash" class="w-4 h-4" />
              <div class="whitespace-nowrap overflow-hidden">Xóa</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import shortcut from "~/mixins/shortcut";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { nextTick, onMounted } from "@vue/runtime-core";
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
const shortcutItem = ref();
const popup = ref();
const isShowOption = ref(false);
const isTop = ref(false);
onMounted(() => {
  let idTimer;
  shortcutItem.value.addEventListener("mousedown", () => {
    idTimer = setTimeout(() => {
      const reactBouding = shortcutItem.value.getBoundingClientRect();
      if (window.innerHeight < reactBouding.y + 200) {
        isTop.value = true;
      }
      isShowOption.value = true;
      nextTick(() => {
        popup.value.focus();
      });
    }, 1000);
  });
  shortcutItem.value.addEventListener("mouseup", () => {
    if (idTimer) {
      clearTimeout(idTimer);
      idTimer = null;
    }
    if (!isShowOption.value) navigation();
  });
});
</script>
