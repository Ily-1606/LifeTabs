<template>
  <div>
    <div>
      <template v-if="isPrecipMm"
        ><span>{{ precip.precip_mm }}</span
        ><span> mm</span>
      </template>
      <template v-else
        ><span>{{ precip.precip_in }}</span
        ><span> in</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    precip: {
      type: Object,
      required: true,
      /**
       * Example data
       * {
       *  precip_mm: 24,
       *  precip_in: 75.2
       * }
       */
    },
  },
  computed: {
    unit() {
      return this.$store.getters.get("unit", "unit")?.precip;
    },
    isPrecipMm() {
      return this.unit === "mm";
    },
  },
};
</script>
