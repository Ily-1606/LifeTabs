<template>
  <div
    class="flex gap-x-3 p-2 border rounded-md border-blue-400 items-center cursor-pointer"
    @click="emits('selected', locationData)"
  >
    <div class="space-y-2">
      <VueFontAwesome icon="fa-light fa-location-dot" class="w-4 h-4 mx-auto" />
      <div class="text-xs">
        <div>KĐ: {{ props.locationData.lon }}</div>
        <div>VĐ: {{ props.locationData.lat }}</div>
      </div>
    </div>
    <div class="space-y-1 text-xs">
      <div class="text-lg">{{ props.locationData.name }}</div>
      <div>{{ props.locationData.country }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  /**
   * Example data:
   * {
      "id": 2728879,
      "name": "Quang Tri",
      "region": "",
      "country": "Vietnam",
      "lat": 21.03,
      "lon": 106.48,
      "url": "quang-tri-vietnam"
    }
   */
  locationData: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["selected"]);
</script>
