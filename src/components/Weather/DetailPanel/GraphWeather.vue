<template>
  <div
    class="grid u-panel text-sm"
    :class="numberClasses[0]"
    v-if="dailyForecasts5DayTemp.length"
  >
    <div
      v-for="(forecast, index) in dailyForecasts5DayTemp"
      :key="index"
      class="space-y-2 text-center"
    >
      <div>
        {{ renderTextDay(forecast.date_epoch) }}
      </div>
      <div>
        {{ moment(forecast.date_epoch * 1000).format("DD/MM") }}
      </div>
      <WeatherIcon
        class="w-6 h-6 mx-auto"
        :code="forecast.condition.code"
        :is-day="true"
      />
    </div>
    <div class="my-6 col-span-5">
      <GraphLine
        :temp="dailyForecasts5DayTemp"
        style="height: 75px"
        :char-height="25"
        type="maxtemp_c"
      />
    </div>
    <div class="my-2 col-span-5">
      <GraphLine
        :temp="dailyForecasts5DayTemp"
        style="height: 75px"
        :char-height="25"
        type="mintemp_c"
      />
    </div>
    <div
      v-for="(forecast, index) in dailyForecasts5DayTemp"
      :key="index"
      class="mt-2 space-y-2 text-center"
    >
      <div>
        <WindyText
          :wind="{
            wind_mph: forecast.maxwind_mph,
            wind_kph: forecast.maxwind_kph,
          }"
        />
      </div>
      <div class="text-center">
        <WindyDirection
          class="flex gap-x-1 justify-center items-center"
          :wind_dir="forecast.wind_dir"
        >
          <template #icon="{ classes }">
            <VueFontAwesome
              icon="fa-light fa-location-arrow"
              class="w-4 h-4"
              :class="classes"
            />
          </template>
          <template #text="{ text }">
            <div
              class="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-center"
            >
              {{ text }}
            </div>
          </template>
        </WindyDirection>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import GraphLine from "../Graph/GraphLine.vue";
import WeatherIcon from "../__Icons/WeatherIcon.vue";
import WindyText from "../Windy/WindyText.vue";
import WindyDirection from "../Windy/WindyDirection.vue";
const store = useStore();
const forecastData = computed(() => {
  return (
    store.getters.get("forecastData", "weather")?.forecast?.forecastday ?? []
  );
});
const dailyForecasts5DayTemp = computed(() => {
  const d = forecastData.value.map((forecast) => {
    const day = forecast.day;
    day.date_epoch = forecast.date_epoch;
    day.wind_dir = forecast.hour[0].wind_dir;
    return day;
  });
  if (d.length) d.push(d[2], d[2]);
  return d;
});

const classes = [
  ["grid-cols-1", "col-span-1"],
  ["grid-cols-1", "col-span-1"],
  ["grid-cols-2", "col-span-2"],
  ["grid-cols-3", "col-span-3"],
  ["grid-cols-4", "col-span-4"],
  ["grid-cols-5", "col-span-5"],
];

const numberClasses = computed(() => {
  return classes[dailyForecasts5DayTemp.value.length];
});

const renderTextDay = (timeunix) => {
  const now = new Date().getDate();
  const target = new Date(timeunix * 1000).getDate();
  if (now === target + 1) {
    return "Hôm qua";
  } else if (now === target) {
    return "Hôm nay";
  } else if (now === target - 1) {
    return "Ngày mai";
  } else {
    const listDays = [
      "Chủ nhật",
      "Th 2",
      "Th 3",
      "Th 4",
      "Th 5",
      "Th 6",
      "Th 7",
    ];
    return listDays[new Date(timeunix * 1000).getDay()];
  }
};
</script>
