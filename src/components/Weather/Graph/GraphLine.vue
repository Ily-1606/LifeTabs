<template>
  <canvas ref="graphLine" />
</template>
<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
const props = defineProps({
  temp: {
    required: true,
    type: Array,
  },
  charHeight: {
    required: true,
    type: Number,
  },
  type: {
    required: true,
    type: String,
  },
});
const min_temp = () => {
  let min = props.temp[0]?.[props.type];
  props.temp.forEach((temp) => {
    if (temp[props.type] < min) {
      min = temp[props.type];
    }
  });
  return min;
};
const max_temp = () => {
  let max = props.temp[0]?.[props.type];
  props.temp.forEach((temp) => {
    if (temp[props.type] > max) {
      max = temp[props.type];
    }
  });
  return max;
};
const graphLine = ref();
const fontFamily = window
  .getComputedStyle(document.body)
  .getPropertyValue("font-family");
const draw = () => {
  const graphLineNode = graphLine.value;
  const graphLineCtx = graphLineNode.getContext("2d");
  const width = (graphLineNode.width = graphLineNode.parentNode.offsetWidth);
  const height = (graphLineNode.height = graphLineNode.parentNode.offsetHeight);
  const widthCell = Math.floor(width / props.temp.length);
  const minTemp = min_temp();
  const maxTemp = max_temp();
  let i = 0;
  const arrDot = [];
  props.temp.forEach((dataTemp) => {
    const temp = Math.round(dataTemp[props.type]);
    const percent = (temp - minTemp) / (maxTemp - minTemp);
    const pointX = widthCell * i + widthCell / 2;
    let pointY = props.charHeight - percent * props.charHeight;
    graphLineCtx.fillStyle = "#000000";
    graphLineCtx.font = `1rem ${fontFamily}`;
    if (pointY < 5) {
      pointY = 5;
      graphLineCtx.fillText(`${temp}°`, pointX - 10, height / 2 + pointY - 22);
    } else if (pointY > height - 5) {
      pointY = height - 5;
      graphLineCtx.fillText(`${temp}°`, pointX - 10, height / 2 + pointY - 22);
    } else {
      graphLineCtx.fillText(`${temp}°`, pointX - 10, height / 2 + pointY - 22);
    }
    graphLineCtx.beginPath();
    graphLineCtx.arc(pointX, height / 2 + pointY - 10, 5, 0, 2 * Math.PI, true);
    graphLineCtx.stroke();

    arrDot.push({ pointX, pointY: pointY - 10 + height / 2 });
    i++;
  });
  for (let i = 0; i < arrDot.length; i++) {
    const element = arrDot[i];
    const elementNext = arrDot[i + 1];
    if (elementNext) {
      graphLineCtx.beginPath();
      graphLineCtx.moveTo(element.pointX + 2 * Math.PI, element.pointY);
      graphLineCtx.lineTo(elementNext.pointX - 2 * Math.PI, elementNext.pointY);
      graphLineCtx.lineWidth = 2;
      graphLineCtx.strokeStyle = "#000000";
      graphLineCtx.stroke();
    }
  }
};
watch(
  () => props.temp,
  () => {
    draw();
  },
  { deep: true }
);
onMounted(() => {
  draw();
});
</script>
