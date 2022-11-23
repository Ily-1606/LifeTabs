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
          class="relative rounded-lg bg-slate-200/50 backdrop-blur-md shadow-md"
        >
          <VueFontAwesome
            :icon="isTop ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'"
            class="w-6 h-6 absolute fill-slate-200"
            :class="
              isTop ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'
            "
          />
          <div class="py-3 px-5">{{ props.data.name }}</div>
          <div class="flex flex-col gap-x-4 gap-y-1 text-sm">
            <div
              class="flex-auto flex items-center gap-x-2 hover:bg-slate-300 cursor-pointer py-2 px-3"
              @click="handleAction('edit', data)"
            >
              <VueFontAwesome icon="fa-light fa-pencil" class="w-4 h-4" />
              <div class="whitespace-nowrap overflow-hidden">Chỉnh sửa</div>
            </div>
            <div
              class="flex-auto flex items-center gap-x-2 hover:bg-slate-300 cursor-pointer py-2 px-3"
              @click="handleAction('pin', data)"
            >
              <VueFontAwesome icon="fa-light fa-thumbtack" class="w-4 h-4" />
              <div class="whitespace-nowrap overflow-hidden">
                Ghim vào taskbar
              </div>
            </div>
            <div
              class="flex-auto flex items-center gap-x-2 hover:bg-slate-300 fill-red-400 text-red-500 cursor-pointer py-2 px-3"
              @click="handleAction('delete', data)"
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
  isSystem: {
    type: [Boolean, Number],
    default: () => false,
  },
});
const emits = defineEmits(["edit", "delete"]);
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
  shortcutItem.value.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  shortcutItem.value.addEventListener("mousedown", (e) => {
    const openOption = () => {
      const reactBouding = shortcutItem.value.getBoundingClientRect();
      if (window.innerHeight < reactBouding.y + 200) {
        isTop.value = true;
      }
      isShowOption.value = true;
      nextTick(() => {
        popup.value.focus();
      });
    };

    if (props.isSystem) return;
    if (e.which === 3) {
      // Right click
      openOption();
      e.preventDefault();
    } else {
      idTimer = setTimeout(() => {
        openOption();
      }, 500);
    }
  });
  shortcutItem.value.addEventListener("mouseup", () => {
    if (idTimer) {
      clearTimeout(idTimer);
      idTimer = null;
    }
    if (!isShowOption.value) navigation();
  });
});
const handleAction = (typeEmit, data) => {
  isShowOption.value = false;
  emits(typeEmit, data);
};
</script>
