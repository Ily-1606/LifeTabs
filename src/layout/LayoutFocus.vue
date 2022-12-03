<template>
  <div class="dark:text-white">
    <slot />
    <div class="fixed bottom-1 left-1/2 -translate-x-1/2">
      <HomeTaskbar />
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import HomeTaskbar from "~/components/Toolbars/HomeTaskbar.vue";
onMounted(() => {
  document.body.classList.remove("dark");
});
</script>
