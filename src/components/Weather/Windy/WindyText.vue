<template>
  <div>
    <template v-if="isKmh"
      ><span>{{ wind.wind_kph }}</span
      ><span> km/h</span>
    </template>
    <template v-else
      ><span>{{ wind.wind_mph }}</span
      ><span> mph</span>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    wind: {
      type: Object,
      required: true,
      /**
       * Example data
       * {
       *  wind_mph: 24,
       *  wind_kph: 75.2
       * }
       */
    },
  },
  computed: {
    unit() {
      return this.$store.getters.get("windy", "unit");
    },
    isKmh() {
      return this.unit === "kph";
    },
  },
};
</script>
