<template>
  <div>
    <div class="min-h-screen min-w-screen flex p-6 justify-between">
      <div class="flex-none min-w-[300px]">
        <EventNear />
      </div>
      <div class="flex-auto"></div>
      <div class="flex-none"></div>
    </div>
  </div>
</template>

<script>
import EventNear from "~/components/Event/EventNear.vue";
export default {
  name: "HomeView",
  components: {
    EventNear,
  },
};
</script>
