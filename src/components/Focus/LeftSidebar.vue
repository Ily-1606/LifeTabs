<template>
  <div class="w-full rounded-lg space-y-4">
    <router-link
      v-for="sidebar in listSidebar"
      :key="sidebar.text"
      :to="{ name: sidebar.routerName }"
      custom
      v-slot="{ isActive, href, navigate }"
    >
      <a
        :href="href"
        @click="navigate"
        class="py-3 px-4 font-medium flex gap-x-3 items-center rounded-lg"
        :class="{ 'bg-lime-600 text-slate-100 fill-slate-100': isActive }"
      >
        <div class="flex-none">
          <VueFontAwesome :icon="sidebar.icon" class="w-4 h-4 fill-inherit" />
        </div>
        <div class="flex-auto">
          {{ sidebar.text }}
        </div>
      </a>
    </router-link>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";

const listSidebar = ref([
  {
    text: "Nhiệm vụ",
    routerName: "focusHome",
    icon: "fa-light fa-chart-waterfall",
  },
  {
    text: "Thống kê",
    routerName: "focusHome",
    icon: "fa-light fa-calendar",
  },
  {
    text: "Danh hiệu",
    routerName: "focusHome",
    icon: "fa-light fa-ribbon",
  },
  {
    text: "Cây",
    routerName: "focusHome",
    icon: "fa-light fa-tree",
  },
  {
    text: "Cài đặt",
    routerName: "focusHome",
    icon: "fa-light fa-gear",
  },
]);
</script>
