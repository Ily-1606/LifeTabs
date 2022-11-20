<template>
  <div>
    <slot name="name" :data="eventName"> </slot>
    <slot name="time" :data="timeStr"></slot>
  </div>
</template>
<script>
import EventNear from "./EventNear.vue";
export default {
  mixins: [EventNear],
};
</script>
