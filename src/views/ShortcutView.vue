<template>
  <div class="max-w-[50%] mx-auto pb-[100px]">
    <div class="w-max mx-auto sticky top-0">
      <div
        class="drop-rain group fill-slate-500 group cursor-pointer"
        @click="isOpenModalAddShortcut = true"
      >
        <VueFontAwesome
          icon="fa-light fa-plus"
          class="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-md group-hover:fill-slate-50 group-hover:rotate-180 transition-transform duration-500"
        />
      </div>
    </div>
    <div
      class="border border-blue-500 rounded-full flex pr-4 pl-4 items-center"
    >
      <div class="flex-auto">
        <input
          class="border-none outline-none w-full py-2 placeholder:text-blue-500"
          v-model="q"
          placeholder="Tìm kiếm..."
        />
      </div>
      <div class="flex-none">
        <VueFontAwesome
          icon="fa-light fa-magnifying-glass"
          class="w-4 h-4 fill-blue-500 cursor-pointer"
          @click="search"
        />
      </div>
    </div>
    <div class="mt-8 space-y-5" v-auto-animate>
      <div
        class="flex items-start gap-x-10"
        v-for="(groupShortcut, char) in listShortcutGroup"
        :key="char"
      >
        <div class="flex-none">#{{ char }}</div>
        <div class="flex-auto flex gap-x-6">
          <Item
            v-for="(shortcut, index) in groupShortcut.shortcuts"
            :data="shortcut"
            :key="index"
          />
        </div>
      </div>
    </div>
    <ModalAddShortcut
      v-if="isOpenModalAddShortcut"
      :is-open="true"
      @close-modal="isOpenModalAddShortcut = false"
    />
  </div>
</template>
<script setup>
import { ref, computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import Item from "~/components/Shortcut/_Item.vue";
import ModalAddShortcut from "~/components/Modal/ModalAddShortcut.vue";

const store = useStore();
const search = () => {};
const q = ref("");
const isOpenModalAddShortcut = ref(false);
watch(q, (newValue, oldValue, onCleanup) => {
  const idTimer = setTimeout(() => {
    console.log(newValue);
  }, 300);
  onCleanup(() => clearTimeout(idTimer));
});
const listShortcut = computed(() => {
  const baseShortcuts = store.getters.get("baseShortcut", "shortcut") ?? [];
  const shortcuts = store.getters.get("shortcuts", "shortcut") ?? [];
  return [...baseShortcuts, ...shortcuts];
});
const listShortcutGroup = computed(() => {
  let mapChar = {};
  listShortcut.value.forEach((element) => {
    const firstChar = element.name[0].toUpperCase();
    if (mapChar[firstChar]) {
      mapChar[firstChar].shortcuts.push(element);
    } else {
      mapChar[firstChar] = { shortcuts: [element] };
    }
  });
  mapChar = Object.keys(mapChar)
    .sort()
    .reduce((obj, key) => {
      obj[key] = mapChar[key];
      return obj;
    }, {});
  return mapChar;
});
store.dispatch("shortcut/getShortcutCached");
</script>
<style scoped>
.drop-rain {
  --color: #eaeaeb;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  transform: translateY(-35px);
  background-color: var(--color);
  border: 6px solid var(--color);
}
.drop-rain:hover {
  --color: rgb(96 165 250);
}
.drop-rain::before {
  content: "";
  position: absolute;
  left: -22px;
  top: 30px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-right-radius: 20px;
  box-shadow: 1px -10px var(--color);
}
.drop-rain::after {
  content: "";
  position: absolute;
  right: -22px;
  top: 30px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-left-radius: 20px;
  box-shadow: -1px -10px var(--color);
}
</style>
