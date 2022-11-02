<template>
  <div
    class="border border-blue-500 rounded-xl p-6 w-full"
    :class="classTheme.border"
  >
    <div class="flex justify-between items-center">
      <div class="flex-none px-4">
        <div class="uppercase text-lg" :class="classTheme.text">
          {{ shareInfo.code }}
        </div>
      </div>
      <div class="flex-auto px-4 space-y-2 text-sm">
        <div>
          Giá: <span :class="classTheme.text">{{ shareInfo.price }}</span>
        </div>
        <div>
          Thay đổi:
          <span :class="classTheme.text" class="mr-2">{{
            shareInfo.change
          }}</span
          ><span :class="classTheme.text">({{ shareInfo.perChange }})</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shareInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDanger() {
      return this.shareInfo.perChange < 0;
    },
    isSafe() {
      return !this.isDanger;
    },
    classTheme() {
      return {
        border: {
          "border-red-500": this.isDanger,
          "border-green-500": this.isSafe,
        },
        text: { "text-red-500": this.isDanger, "text-green-500": this.isSafe },
      };
    },
  },
};
</script>
