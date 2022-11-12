<template>
  <VueFontAwesome :icon="icon" class="w-6 h-6" />
</template>
<script setup>
import { readonly, computed } from "@vue/reactivity";
const props = defineProps({
  code: {
    type: [String, Number],
    required: true,
  },
  isDay: {
    type: Boolean,
    required: true,
  },
});
const icons = readonly({
  1000: {
    day: "fa-light fa-sun",
    night: "fa-light fa-moon-stars",
  },
  1003: {
    day: "fa-light fa-cloud",
    night: "fa-light fa-cloud-moon",
  },
  1006: {
    day: "fa-light fa-clouds",
    night: "fa-light fa-clouds-moon",
  },
  1009: {
    day: "fa-light fa-clouds",
    night: "fa-light fa-clouds-moon",
  },
  1030: {
    day: "fa-light fa-cloud-fog",
    night: "fa-light fa-cloud-fog",
  },
  1063: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1066: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1069: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1072: {
    day: "fa-light fa-cloud-hail-mixed",
    night: "fa-light fa-cloud-hail-mixed",
  },
  1087: {
    day: "fa-light fa-cloud-bolt",
    night: "fa-light fa-cloud-bolt-moon",
  },
  1114: {
    day: "fa-light fa-snow-blowing",
    night: "fa-light fa-snow-blowing",
  },
  1117: {
    day: "fa-light fa-snow-blowing",
    night: "fa-light fa-snow-blowing",
  },
  1135: {
    day: "fa-light fa-cloud-fog",
    night: "fa-light fa-cloud-fog",
  },
  1147: {
    day: "fa-light fa-cloud-fog",
    night: "fa-light fa-cloud-fog",
  },
  1150: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1153: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1168: {
    day: "fa-light fa-cloud-hail-mixed",
    night: "fa-light fa-cloud-hail-mixed",
  },
  1171: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1180: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1183: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1186: {
    day: "fa-light fa-cloud-showers",
    night: "fa-light fa-cloud-moon-rain",
  },
  1189: {
    day: "fa-light fa-cloud-showers",
    night: "fa-light fa-cloud-moon-rain",
  },
  1192: {
    day: "fa-light fa-cloud-showers-heavy",
    night: "fa-light fa-cloud-moon-rain",
  },
  1195: {
    day: "fa-light fa-cloud-showers-heavy",
    night: "fa-light fa-cloud-moon-rain",
  },
  1198: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1201: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1204: {
    day: "fa-light fa-cloud-sleet",
    night: "fa-light fa-cloud-sleet",
  },
  1207: {
    day: "fa-light fa-cloud-sleet",
    night: "fa-light fa-cloud-sleet",
  },
  1210: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1213: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1216: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1219: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1222: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1225: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1237: {
    day: "fa-light fa-cloud-hail",
    night: "fa-light fa-cloud-hail",
  },
  1240: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1243: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1246: {
    day: "fa-light fa-cloud-showers-heavy",
    night: "fa-light fa-cloud-moon-rain",
  },
  1249: {
    day: "fa-light fa-cloud-sleet",
    night: "fa-light fa-cloud-sleet",
  },
  1252: {
    day: "fa-light fa-cloud-sleet",
    night: "fa-light fa-cloud-sleet",
  },
  1255: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1258: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1261: {
    day: "fa-light fa-cloud-hail",
    night: "fa-light fa-cloud-hail",
  },
  1264: {
    day: "fa-light fa-cloud-hail",
    night: "fa-light fa-cloud-hail",
  },
  1273: {
    day: "fa-light fa-cloud-drizzle",
    night: "fa-light fa-cloud-drizzle",
  },
  1276: {
    day: "fa-light fa-cloud-moon-rain",
    night: "fa-light fa-cloud-moon-rain",
  },
  1279: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
  1282: {
    day: "fa-light fa-cloud-snow",
    night: "fa-light fa-cloud-snow",
  },
});
const icon = computed(() => {
  if (props.isDay) {
    return icons[props.code]?.day;
  }
  return icons[props.code]?.night;
});
</script>
