<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition
        leave-to-class="opacity-0 transition-all absolute duration-[0ms]"
        enter-from-class="opacity-0 transition-all absolute duration-[1000ms]"
        enter-to-class="opacity-1 transition-all duration-[1000ms]"
        :duration="500"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>
<script>
import layoutMixins from "./mixins/layout";
export default {
  mixins: [layoutMixins],
  data() {
    return {
      layout: "default",
    };
  },
  watch: {
    "$route.name": {
      handler() {
        if (this.$route.meta.layout) {
          this.layout = this.$route.meta.layout;
        }
      },
      deep: true,
    },
  },
};
</script>
