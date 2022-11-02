<template>
  <div class="w-full overflow-auto py-3">
    <div class="flex gap-x-4">
      <div class="flex-none" v-for="(sport, index) in sports" :key="index">
        <ItemFootball :data="sport" />
      </div>
    </div>
  </div>
</template>
<script>
import ItemFootball from "./Items/_ItemFootball.vue";
export default {
  components: {
    ItemFootball,
  },
  data() {
    return {
      sports: [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
      ],
    };
  },
};
</script>
