<template>
  <div class="p-4 border border-blue-500 rounded-lg">
    <div class="mb-3">
      {{ status[data.status] }}
    </div>
    <div class="flex items-center gap-x-6">
      <div class="flex-none">
        {{ data.teams[0].name }}
      </div>
      <div class="flex-none">
        <div
          class="bg-green-500 rounded-full px-4 py-1 flex text-white text-sm font-semibold"
        >
          <span>{{ data.teams[0].goals }}</span>
          <span>-</span>
          <span>{{ data.teams[1].goals }}</span>
        </div>
      </div>
      <div class="flex-none">
        {{ data.teams[1].name }}
      </div>
    </div>
  </div>
</template>
<script>
import sportStatus from "~/utils/sport/status";
export default {
  mixins: [sportStatus],
  props: {
    data: {
      type: Object,
      /**
       * The data example of item
       */
      default() {
        return {
          status: "playing",
          teams: [
            {
              name: "Bình định",
              goals: 1,
            },
            {
              name: "Gia Lai",
              goals: 2,
            },
          ],
        };
      },
    },
  },
};
</script>
