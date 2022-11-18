<template>
  <div class="max-w-[50%] mx-auto py-4">
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
    <div class="mt-8 space-y-5">
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
  </div>
</template>
<script setup>
import { ref, computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import Item from "~/components/Shortcut/_Item.vue";

const store = useStore();
const search = () => {};
const q = ref("");
watch(q, (newValue, oldValue, onCleanup) => {
  const idTimer = setTimeout(() => {
    console.log(newValue);
  }, 300);
  onCleanup(() => clearTimeout(idTimer));
});
const listShortcut = computed(() => {
  return store.getters.get("baseShortcut", "shortcut") ?? [];
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
</script>
