<template>
  <div>
    <div class="text-lg">
      <template v-if="isTempC"
        ><span>{{ temp.temp_c }}</span
        ><span>°C</span>
      </template>
      <template v-else
        ><span>{{ temp.temp_f }}</span
        ><span>°F</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    temp: {
      type: Object,
      required: true,
      /**
       * Example data
       * {
       *  temp_c: 24,
       *  temp_f: 75.2
       * }
       */
    },
  },
  computed: {
    unit() {
      return this.$store.getters.get("temp", "unit");
    },
    isTempC() {
      return this.unit === "c";
    },
  },
};
</script>
