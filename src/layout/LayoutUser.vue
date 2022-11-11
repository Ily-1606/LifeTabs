<template>
  <div>
    <slot />
    <HomeTaskbar class="fixed bottom-1 left-1/2 -translate-x-1/2" />
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
