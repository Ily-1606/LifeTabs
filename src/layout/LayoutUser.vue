<template>
  <div class="dark:text-white">
    <slot />
    <component :is="component" class="absolute -z-10 inset-0" />
    <div class="fixed bottom-1 left-1/2 -translate-x-1/2">
      <HomeTaskbar />
    </div>
  </div>
</template>
<script setup>
import HomeTaskbar from "~/components/Toolbars/HomeTaskbar.vue";
import NightClear from "~/components/Theme/Weather/NightClear.vue";
import { ref } from "@vue/reactivity";
const now = new Date();
const component = ref("div");
if (now.getHours() >= 17) {
  document.body.classList.add("dark");
  component.value = NightClear;
}
</script>
