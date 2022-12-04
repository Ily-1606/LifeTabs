<template>
  <div class="dark:text-white">
    <slot />
  </div>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
onMounted(() => {
  document.body.classList.remove("dark");
});
</script>
