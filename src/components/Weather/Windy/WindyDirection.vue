<template>
  <div>
    <slot name="icon" :classes="classDirection" />
    <slot name="text" :text="textDirection" />
  </div>
</template>
<script setup>
import { readonly, computed } from "@vue/reactivity";
import windyDirection from "~/utils/weather/windy-direction";
const directionsObject = readonly(windyDirection);
const props = defineProps({
  wind_dir: {
    type: String,
    required: true,
  },
});
const textDirection = computed(() => directionsObject[props.wind_dir].langs.vi);
const classDirection = computed(() => {
  // if(props.wind_dir === "N") {
  //   return "transl"
  // }
  return "";
});
</script>
