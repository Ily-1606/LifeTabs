<template>
  <div class="max-w-[50%] mx-auto pb-[100px]">
    <div class="w-max mx-auto sticky top-0">
      <RainDrop @open="isOpenModalAddShortcut = true" />
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
            :is-system="shortcut.isSystem ? true : false"
            :key="index"
            @edit="handleOpenModalEdit"
            @delete="handleOpenModalDelete"
            @pin="handlePinShortcut"
          />
        </div>
      </div>
    </div>
    <ModalAddShortcut
      v-if="isOpenModalAddShortcut"
      :is-open="true"
      @close-modal="isOpenModalAddShortcut = false"
    />
    <ModalEditShortcut
      v-if="isOpenModalEditShortcut"
      :is-open="true"
      :data="currentDataEditing"
      @close-modal="isOpenModalEditShortcut = false"
    />
    <ModalDeleteShortcut
      v-if="isOpenModalDeleteShortcut"
      :is-open="true"
      :data="currentDataEditing"
      @close-modal="isOpenModalDeleteShortcut = false"
    />
  </div>
</template>
<script setup>
import { ref, computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import Item from "~/components/Shortcut/_Item.vue";
import ModalAddShortcut from "~/components/Modal/ModalAddShortcut.vue";
import ModalEditShortcut from "~/components/Modal/ModalEditShortcut.vue";
import ModalDeleteShortcut from "~/components/Modal/ModalDeleteShortcut.vue";
import RainDrop from "~/components/Other/RainDrop.vue";

const store = useStore();
const search = () => {};
const q = ref("");
const Q = ref();
const isOpenModalEditShortcut = ref(false);
const isOpenModalAddShortcut = ref(false);
const isOpenModalDeleteShortcut = ref(false);
let currentDataEditing = ref({});
watch(q, (newValue, oldValue, onCleanup) => {
  const idTimer = setTimeout(() => {
    Q.value = newValue;
  }, 300);
  onCleanup(() => clearTimeout(idTimer));
});
const listShortcut = computed(() => {
  const baseShortcuts = store.getters.get("baseShortcut", "shortcut") ?? [];
  const shortcuts = store.getters.get("shortcuts", "shortcut") ?? [];
  const res = [
    ...baseShortcuts.map((_) => {
      _.isSystem = true;
      return _;
    }),
    ...shortcuts,
  ];
  if (Q.value) {
    return res.filter((_) => _.name.includes(Q.value));
  }
  return res;
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
const handleOpenModalEdit = (shortcutData) => {
  isOpenModalEditShortcut.value = true;
  currentDataEditing.value = shortcutData;
};
const handleOpenModalDelete = (shortcutData) => {
  isOpenModalDeleteShortcut.value = true;
  currentDataEditing.value = shortcutData;
};
const handlePinShortcut = (shortcutData) => {
  store
    .dispatch("shortcut/pinShortcut", {
      params: {
        id: shortcutData.id,
      },
    })
    .then(() => {
      store.dispatch("shortcut/getShortcut");
    });
};
</script>
