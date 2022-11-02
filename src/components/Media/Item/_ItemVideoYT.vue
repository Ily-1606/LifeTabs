<template>
  <div class="p-4 bg-white rounded-lg">
    <img class="w-full rounded-lg" :src="data.thumbnail" />
    <div class="mt-2">
      {{ data.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      /**
       * The example data of item
       */
      default() {
        return {
          thumbnail: "",
          name: "",
          link: "",
        };
      },
    },
  },
};
</script>
