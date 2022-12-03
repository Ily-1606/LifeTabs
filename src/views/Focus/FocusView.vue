<template>
  <div>
    <div><FocusHeader /></div>
    <div class="max-w-5xl mx-auto mt-20 flex gap-x-10">
      <LeftSidebar class="w-60 flex-none" />
      <div class="flex-auto">
        <div class="mx-auto">
          <TreePlant />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LeftSidebar from "~/components/Focus/LeftSidebar.vue";
import TreePlant from "./TreePlant.vue";
import FocusHeader from "~/components/Headers/FocusHeader.vue";
</script>
