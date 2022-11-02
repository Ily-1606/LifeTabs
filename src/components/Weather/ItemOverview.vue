<template>
  <div class="space-y-6 border border-blue-500 rounded-xl p-6 w-full text-sm">
    <div class="flex gap-x-5 items-center">
      <div class="flex-none w-14 space-y-2 text-center">
        <cloudsIcon class="mx-auto" />
        <div class="text-ellipsis overflow-hidden whitespace-nowrap">
          Đà Nẵng
        </div>
      </div>
      <div class="flex-auto space-y-1">
        <div class="text-lg"><span>30</span><span>°C</span></div>
        <div class="text-ellipsis overflow-hidden whitespace-nowrap">
          Trời có nhiều mây
        </div>
      </div>
    </div>
    <div class="flex gap-x-5 items-center">
      <div class="flex-none w-14 space-y-2 text-center">
        <VueFontAwesome
          icon="fa-light fa-leaf"
          class="w-6 h-6 fill-green-500 mx-auto"
        />
      </div>
      <div class="flex-auto space-y-1">
        <div class="text-lg text-blue-500">18 AQI</div>
        <div>Chất lượng không khí tốt, một ngày hoàn hảo để đi dạo</div>
      </div>
    </div>
  </div>
</template>
<script>
import cloudsIcon from "./__Icons/__Clouds.vue";
export default {
  components: {
    cloudsIcon,
  },
};
</script>
