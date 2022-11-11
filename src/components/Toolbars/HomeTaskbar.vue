<template>
  <div
    class="flex items-center justify-around px-8 py-6 rounded-xl bg-slate-100 gap-x-4"
    v-auto-animate
  >
    <div
      v-for="(shortcut, index) in shortcuts"
      @click="setAction(shortcut.action)"
      :key="index"
      class="flex items-center justify-between gap-x-3 cursor-pointer transition-all px-4 py-2 duration-[200ms]"
      :class="{
        'bg-blue-500 rounded-xl': routerActivating === shortcut.name,
        'flex-row-reverse': index === shortcuts.length - 1,
      }"
    >
      <VueFontAwesome
        :icon="shortcut.icon"
        class="w-6 h-6"
        :class="{ 'fill-white': routerActivating === shortcut.name }"
      />
      <div
        class="w-0 text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-[200ms]"
        :class="{
          '!w-14 text-white': routerActivating === shortcut.name,
        }"
      >
        {{ shortcut.text }}
      </div>
    </div>
  </div>
</template>
<script>
import shortcutMixin from "~/mixins/shortcut";
export default {
  mixins: [shortcutMixin],
  computed: {
    shortcuts() {
      return this.$store.getters.get("baseShortcut", "shortcut") || [];
    },
    routerActivating() {
      return this.$route.meta.active;
    },
  },
  methods: {
    setAction(action) {
      this[action](); // Call methods from mixins
    },
  },
};
</script>
