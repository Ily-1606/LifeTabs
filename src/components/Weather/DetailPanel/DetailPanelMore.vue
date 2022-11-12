<template>
  <div class="u-panel">
    <div class="grid grid-cols-2 gap-y-4 text-sm">
      <div class="space-y-1">
        <div>Chỉ số nóng bức</div>
        <div>
          <TempText :temp="heatIndex" />
        </div>
      </div>
      <div class="space-y-1">
        <div>Điểm sương</div>
        <div>
          <TempText :temp="drewPoint" />
        </div>
      </div>
      <div class="space-y-1">
        <div>Tầm nhìn xa</div>
        <div>{{ forecastCurrentHour.vis_km }} km</div>
      </div>
      <div class="space-y-1">
        <div>Lượng mưa</div>
        <PrecipText :precip="precip" />
      </div>
      <div class="space-y-1">
        <div>Có mây</div>
        <div>{{ forecastCurrentHour.cloud }}%</div>
      </div>
      <div class="space-y-1">
        <div>Chỉ số phong hàn</div>
        <TempText :temp="windchill" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import TempText from "../Temp/TempText.vue";
import PrecipText from "../Precip/PrecipText.vue";
const store = useStore();
const forecastCurrentHour = computed(() => {
  const hours =
    store.getters.get("forecastData", "weather")?.forecast?.forecastday[0]
      .hour ?? [];
  const now = new Date().getTime();
  const currentHour = hours.find((hourData) => {
    return now <= hourData.time_epoch * 1000 + 1000 * 60 * 60;
  });
  return currentHour ?? {};
});
const heatIndex = computed(() => {
  return {
    temp_c: forecastCurrentHour.value.heatindex_c,
    temp_f: forecastCurrentHour.value.heatindex_f,
  };
});
const drewPoint = computed(() => {
  return {
    temp_c: forecastCurrentHour.value.dewpoint_c,
    temp_f: forecastCurrentHour.value.dewpoint_f,
  };
});
const precip = computed(() => {
  return {
    precip_in: forecastCurrentHour.value.precip_in,
    precip_mm: forecastCurrentHour.value.precip_mm,
  };
});
const windchill = computed(() => {
  return {
    temp_c: forecastCurrentHour.value.windchill_c,
    temp_f: forecastCurrentHour.value.windchill_f,
  };
});
</script>
