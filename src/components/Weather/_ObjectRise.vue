<template>
  <div class="relative h-full mx-4">
    <slot
      name="objectIcon"
      :objectOffsetY="objectOffsetY"
      :objectOffsetX="objectOffsetX"
    ></slot>
    <svg
      class="sun-line-dash stroke-[2] stroke-inherit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 100"
    >
      <path d="M.37,99.25q176-197.53,350,0" style="fill: none" ref="parabola" />
    </svg>
    <svg
      class="sun-line stroke-[2] absolute top-0 left-0 z-20 transition-all stroke-inherit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 100"
    >
      <path d="M.37,99.25q176-197.53,350,0" style="fill: none" />
    </svg>
  </div>
</template>
<style scoped>
.sun-line {
  stroke-dasharray: v-bind(dashArray);
  stroke-dashoffset: v-bind(currentOffset);
}
.sun-line-dash {
  stroke-dasharray: 7;
}
</style>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isMounted: false,
      dashArray: 400,
      perimeter: 350, // unit px
    };
  },
  computed: {
    currentOffset() {
      return this.dashArray - this.dashArray * this.percent;
    },
    objectOffsetX() {
      return this.percent * this.perimeter;
    },
    objectOffsetY() {
      if (this.isMounted) {
        const { width, height } = this.$refs.parabola.getBoundingClientRect();
        const width_mean = width / 2;
        const b = (2 * height) / width_mean;
        const a = (height - b * width_mean) / (width_mean * width_mean);
        const x = this.objectOffsetX;
        const y = a * (x * x) + b * x;
        return y;
      }
      return 0;
    },
  },
  methods: {
    getTextTime(date) {
      const hours = date.getHours();
      const mins = date.getMinutes();
      return `${hours < 10 ? "0" + hours : hours}:${
        mins < 10 ? "0" + mins : mins
      }`;
    },
  },
  mounted() {
    this.isMounted = true;
    const { width } = this.$refs.parabola.getBoundingClientRect();
    this.perimeter = width;
  },
};
</script>
