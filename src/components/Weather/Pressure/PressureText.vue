<template>
  <div>
    <div>
      <template v-if="isPressureIn"
        ><span>{{ pressure.pressure_in }}</span
        ><span> inHg</span>
      </template>
      <template v-else
        ><span>{{ pressure_in.pressure_mb }}</span
        ><span> mbar</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pressure: {
      type: Object,
      required: true,
      /**
       * Example data
       * {
       *  pressure_mb: 24,
       *  pressure_in: 75.2
       * }
       */
    },
  },
  computed: {
    unit() {
      return this.$store.getters.get("unit", "unit")?.pressure;
    },
    isPressureIn() {
      return this.unit === "in";
    },
  },
};
</script>
