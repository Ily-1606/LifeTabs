<template>
  <div
    class="w-max mx-auto p-12 box-content border-2 border-lime-600 rounded-full"
  >
    <div v-html="SeedSvg" class="w-40 inline-block h-40"></div>
  </div>
</template>
<script setup>
import SeedSvg from "~/assets/images/focus/tree/seed.svg?raw";
</script>
