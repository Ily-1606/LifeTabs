<template>
  <div>
    <slot />
    <div class="fixed bottom-1 left-1/2 -translate-x-1/2">
      <HomeTaskbar />
    </div>
  </div>
</template>
<script>
import HomeTaskbar from "~/components/Toolbars/HomeTaskbar.vue";
export default {
  components: {
    HomeTaskbar,
  },
};
</script>
