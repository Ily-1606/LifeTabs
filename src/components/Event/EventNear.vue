<template>
  <div class="u-panel">
    <div class="flex gap-x-6 items-center">
      <div class="w-10 h-10">
        <lottie-player
          :src="clockLottie"
          background="transparent"
          speed="0.5"
          loop
          autoplay
          :direction="direction"
        ></lottie-player>
      </div>
      <div>
        <div class="text-lg font-semibold">
          {{ eventName }}
        </div>
        {{ timeStr }}
      </div>
    </div>
  </div>
</template>
<script>
import clockLottie from "~/assets/lottie/80321-green-clock.json?url";
import { countDown } from "~/utils/event";
export default {
  computed: {
    nextEvent() {
      return this.$store.getters.get("nextEvent", "event");
    },
    eventName() {
      return this.nextEvent.name;
    },
    eventTime() {
      return this.nextEvent.next_time ?? new Date().getTime();
    },
  },
  data() {
    return {
      clockLottie,
      timeStr: "",
      direction: 1,
    };
  },
  methods: {
    countDown() {
      this.timeStr = countDown(new Date().getTime(), this.eventTime);
      setInterval(() => {
        this.timeStr = countDown(new Date().getTime(), this.eventTime);
      }, 1000);
    },
  },
  created() {
    this.countDown();
  },
};
</script>
