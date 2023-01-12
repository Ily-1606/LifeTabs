<template>
  <div
    class="flex items-center justify-around px-8 py-2 rounded-xl dark:bg-white/40 bg-slate-400/20 gap-x-4 backdrop-blur-md z-20"
    v-auto-animate
  >
    <div
      v-for="(shortcut, index) in shortcuts"
      @click.left="setAction(shortcut)"
      @click.right="setContext($event, shortcut, index)"
      @contextmenu.prevent
      :key="shortcut.name"
      class="flex items-center justify-between cursor-pointer transition-all px-4 py-2 duration-[200ms] relative"
      :class="{
        'bg-blue-500 rounded-xl': routerActivating === shortcut.routerName,
        'flex-row-reverse': index === shortcuts.length - 1,
        'bg-gray-500/30 rounded-lg': shortcut.isShowOption,
      }"
    >
      <div class="flex-none">
        <VueFontAwesome
          v-if="shortcut.icon"
          :icon="shortcut.icon"
          class="w-6 h-6"
          :class="{ 'fill-white': routerActivating === shortcut.routerName }"
        />
        <div
          v-else
          :style="{
            backgroundImage: `url(${BASE_STORAGE_URL}/${shortcut.imageUrl})`,
          }"
          class="w-6 h-6 rounded-lg mx-auto bg-contain bg-center"
        />
      </div>
      <div
        class="w-0 text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-[200ms]"
        :class="{
          '!w-14 text-white ml-3': routerActivating === shortcut.routerName,
        }"
      >
        {{ shortcut.name }}
      </div>
      <div
        class="absolute bottom-full bg-slate-300/30 backdrop-blur-sm shadow-md rounded-md outline-none"
        :id="`taskbar_${index}`"
        tabindex="-1"
        v-show="shortcut.isShowOption"
        @focusout="shortcut.isShowOption = false"
      >
        <div class="mx-4 my-2">
          {{ shortcut.name }}
        </div>
        <div class="my-4 space-y-4">
          <div
            class="p-2 flex space-x-2 items-center hover:bg-slate-200/50"
            @click.stop="unPin(shortcut)"
          >
            <div class="flex-none">
              <VueFontAwesome icon="fa-light fa-thumbtack" class="w-4 h-4" />
            </div>
            <div
              class="flex-auto whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Bỏ ghim
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import shortcutMixin from "~/mixins/shortcut";
export default {
  mixins: [shortcutMixin],
  data() {
    return {
      BASE_STORAGE_URL: import.meta.env.VITE_APP_BASE_STORAGE,
    };
  },
  computed: {
    shortcuts() {
      const baseShortcuts =
        this.$store.getters.get("baseShortcut", "shortcut") ?? [];
      const shortcuts = this.$store.getters.get("shortcuts", "shortcut") ?? [];
      const res = [
        ...baseShortcuts.map((_) => {
          _.isSystem = true;
          return _;
        }),
        ...shortcuts.filter((_) => _.isPin),
      ];
      return res;
    },
    routerActivating() {
      return this.$route.meta.active;
    },
  },
  methods: {
    setAction(shortcut) {
      if (shortcut.action) {
        this[shortcut.action](); // Call methods from mixins
        return;
      }
      window.open(shortcut.url, "_blank");
    },
    setContext($event, shortcut, index) {
      if (shortcut.isSystem) return;
      shortcut.isShowOption = true;
      this.$nextTick(() => {
        $event.currentTarget.querySelector(`#taskbar_${index}`).focus();
      });
    },
    unPin(shortcut) {
      shortcut.isShowOption = false;
      this.$store
        .dispatch("shortcut/unPinShortcut", {
          params: {
            id: shortcut.id,
          },
        })
        .then(() => {
          this.$store.dispatch("shortcut/getShortcut");
        });
    },
  },
  created() {
    this.$store.dispatch("shortcut/getShortcutCached");
  },
};
</script>
