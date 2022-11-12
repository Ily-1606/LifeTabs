<template>
  <div class="u-panel">
    <div class="grid grid-cols-2 gap-y-4 text-sm">
      <div class="space-y-1">
        <div>Cảm giác như</div>
        <div>
          <TempText :temp="temp" />
        </div>
      </div>
      <div class="space-y-1">
        <div>Độ ẩm</div>
        <div>{{ currentWeather?.humidity ?? 0 }}%</div>
      </div>
      <div class="space-y-1">
        <div>Có thể mưa</div>
        <div>{{ forecastDayWeather?.daily_chance_of_rain ?? 0 }}%</div>
      </div>
      <div class="space-y-1">
        <div>Áp suất</div>
        <PressureText :pressure="pressure" />
      </div>
      <div class="space-y-1">
        <div>Tốc độ gió</div>
        <WindyText :wind="wind" />
      </div>
      <div class="space-y-1">
        <div>Chỉ số UV</div>
        {{ currentWeather?.uv }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import TempText from "../Temp/TempText.vue";
import PressureText from "../Pressure/PressureText.vue";
import WindyText from "../Windy/WindyText.vue";
const store = useStore();
const currentWeather = computed(() => {
  return store.getters.get("currentWeather", "weather")?.current ?? {};
});
const forecastDayWeather = computed(() => {
  return (
    store.getters.get("forecastData", "weather")?.forecast?.forecastday[0]
      .day ?? {}
  );
});
const temp = computed(() => {
  return {
    temp_c: currentWeather.value.feelslike_c,
    temp_f: currentWeather.value.feelslike_f,
  };
});
const pressure = computed(() => {
  return {
    pressure_mb: currentWeather.value.pressure_mb,
    pressure_in: currentWeather.value.pressure_in,
  };
});
const wind = computed(() => {
  return {
    wind_mph: currentWeather.value.wind_mph,
    wind_kph: currentWeather.value.wind_kph,
  };
});
</script>
