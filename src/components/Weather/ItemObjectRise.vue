<template>
  <div>
    <div class="u-panel" :style="themeColor">
      <ObjectRiseChartLine :percent="percent">
        <template v-if="isSun" #objectIcon="{ objectOffsetX, objectOffsetY }">
          <VueFontAwesome
            icon="fa-light fa-sun-bright"
            class="fill-orange-500 w-8 h-8 absolute -translate-x-1/2 translate-y-1/2"
            :style="{
              left: objectOffsetX + 'px',
              bottom: objectOffsetY + 'px',
            }"
          />
        </template>
        <template
          v-else-if="isMoon"
          #objectIcon="{ objectOffsetX, objectOffsetY }"
        >
          <VueFontAwesome
            icon="fa-light fa-moon"
            class="fill-slate-500 w-8 h-8 absolute -translate-x-1/2 translate-y-1/2"
            :style="{
              left: objectOffsetX + 'px',
              bottom: objectOffsetY + 'px',
            }"
          />
        </template>
      </ObjectRiseChartLine>
      <div class="mt-6 flex items-center justify-between text-sm">
        <div class="flex-none">
          <span v-if="isSun">Bình minh: </span>
          <span v-else>Trăng mọc: </span>
          <span>{{ textTimeStart }}</span>
        </div>
        <div class="flex-none">
          <span v-if="isSun">Hoàng hôn: </span>
          <span v-else>Trăng lặn: </span>
          <span>{{ textTimeEnd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ObjectRiseChartLine from "./_ObjectRise.vue";
import momentMixins from "~/mixins/moment";
export default {
  mixins: [momentMixins],
  components: {
    ObjectRiseChartLine,
  },
  data() {
    return {
      isSun: false,
      isMoon: false,
      percent: 0,
      timeStart: null,
      timeEnd: null,
    };
  },
  computed: {
    astronomy() {
      const astronomy = this.$store.getters.get("astronomy", "weather");
      return astronomy?.astro;
    },
    textTimeStart() {
      const text = this.convertAM2FullTime(this.timeStart);
      return text;
    },
    textTimeEnd() {
      const text = this.convertAM2FullTime(this.timeEnd);
      return text;
    },
    themeColor() {
      if (this.isMoon) {
        return [{ stroke: "rgb(137 137 137)" }];
      }
      return [{ stroke: "#f4b400" }];
    },
  },
  methods: {
    betWeenTimeData(timeStart, timeEnd) {
      const timeStartInt = this.convertAM2Date(timeStart).valueOf();
      let timeEndInt = this.convertAM2Date(timeEnd).valueOf();
      if (timeEndInt < timeStartInt) {
        timeEndInt += 1000 * 60 * 60 * 24;
      }
      const currentDate = new Date();
      const timeNowInt = currentDate.valueOf();
      return {
        isBetween: timeStartInt <= timeNowInt && timeNowInt <= timeEndInt,
        percent: (timeNowInt - timeStartInt) / (timeEndInt - timeStartInt),
      };
    },
  },
  watch: {
    astronomy(astro) {
      const sunData = this.betWeenTimeData(astro.sunrise, astro.sunset);
      if (sunData.isBetween) {
        this.isSun = true;
        if (sunData.percent < 0) this.percent = 0;
        else if (sunData.percent > 1) this.percent = 1;
        else this.percent = sunData.percent;
        this.timeStart = astro.sunrise;
        this.timeEnd = astro.sunset;
        return;
      }
      const moonData = this.betWeenTimeData(astro.moonrise, astro.moonset);
      this.isMoon = true;
      if (moonData.percent < 0) this.percent = 0;
      else if (moonData.percent > 1) this.percent = 1;
      else this.percent = moonData.percent;
      this.timeStart = astro.moonrise;
      this.timeEnd = astro.moonset;
    },
  },
};
</script>
