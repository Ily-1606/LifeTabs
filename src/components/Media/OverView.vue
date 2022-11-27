<template>
  <div class="grid grid-cols-3 md:grid-cols-2 gap-3">
    <div v-for="(video, index) in videos" :key="index" class="">
      <ItemVideoYTVue :data="video" />
    </div>
  </div>
</template>
<script>
import videoPictureExample from "~/assets/images/example_data/3107.jpg?url";
import ItemVideoYTVue from "./Item/_ItemVideoYT.vue";
export default {
  components: {
    ItemVideoYTVue,
  },
  data() {
    return {
      videos: [
        {
          thumbnail: videoPictureExample,
          name: "3107 - W/n ( Official Video ) ft. Nâu, Duongg",
          link: "https://www.youtube.com/watch?v=V5GS5ANG96M",
        },
        {
          thumbnail: videoPictureExample,
          name: "3107 - W/n ( Official Video ) ft. Nâu, Duongg",
          link: "https://www.youtube.com/watch?v=V5GS5ANG96M",
        },
        {
          thumbnail: videoPictureExample,
          name: "3107 - W/n ( Official Video ) ft. Nâu, Duongg",
          link: "https://www.youtube.com/watch?v=V5GS5ANG96M",
        },
      ],
    };
  },
};
</script>
