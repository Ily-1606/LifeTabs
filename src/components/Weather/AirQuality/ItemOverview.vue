<template>
  <div class="flex gap-x-5 items-center">
    <div class="flex-none w-14 space-y-2 text-center">
      <VueFontAwesome
        icon="fa-light fa-leaf"
        class="w-6 h-6 fill-green-500 mx-auto"
      />
      <div class="text-lg text-blue-500">{{ condition }} AQI</div>
    </div>
    <div class="flex-auto space-y-1">
      <div class="text-sm">{{ textAlert }}</div>
    </div>
  </div>
</template>
<script>
import { calcAQI, listTitleAlerts } from "~/utils/weather/aqi.js";
export default {
  props: {
    airData: {
      type: Object,
      required: true,
      default() {
        return {
          co: 337.1000061035156,
          "gb-defra-index": 3,
          no2: 3.5,
          o3: 66.5,
          pm2_5: 26.899999618530273,
          pm10: 32.5,
          so2: 2.299999952316284,
          "us-epa-index": 2,
        };
      },
    },
  },
  data() {
    return {
      listConditions: ["co", "no2", "o3", "pm2_5", "pm10", "so2"],
    };
  },
  computed: {
    condition() {
      if (Object.keys(this.airData).length) {
        const aqiIndexes = this.listConditions.map((condition) => {
          return this.calcAQI(condition, this.airData[condition]);
        });
        const conditionMax = Math.max(...aqiIndexes);
        return Math.floor(conditionMax);
      }
      return 0;
    },
    qualityIndex() {
      return this.airData?.["us-epa-index"] - 1 ?? 0;
    },
    objectAlert() {
      return listTitleAlerts[this.qualityIndex];
    },
    textAlert() {
      return this.objectAlert?.description;
    },
  },
  methods: {
    calcAQI(key, value) {
      let valueFormatted = value;
      const listToPPM = ["co"];
      listToPPM.forEach((_) => {
        if (key === _) valueFormatted /= 1000;
      });
      return calcAQI({ key, value: valueFormatted });
    },
  },
};
</script>
