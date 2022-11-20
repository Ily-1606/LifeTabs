<template>
  <div class="u-panel">
    <div class="text-lg font-semibold text-center">
      {{ eventName }}
    </div>
    <div class="flex gap-x-6 items-center">
      <div class="w-10 h-10">
        <lottie-player
          :src="clockLottie"
          background="transparent"
          speed="0.5"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div>
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
    listEvents() {
      return this.$store.getters.get("listEvents", "event");
    },
    nextEvent() {
      return this.listEvents[0];
    },
    eventName() {
      return this.nextEvent.name;
    },
    eventTime() {
      return this.nextEvent.next_time;
    },
  },
  data() {
    return {
      clockLottie,
      timeStr: "",
    };
  },
  methods: {
    countDown() {
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
