<template>
  <div class="flex items-center gap-x-6">
    <div class="w-10 h-10 flex-none">
      <img :src="data.fromUser.avatar" class="rounded-full" />
    </div>
    <div class="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
      {{ data.message }}
    </div>
    <div class="flex-none">
      {{ currentTime }}
    </div>
  </div>
</template>
<script>
import avatarUser from "~/assets/images/avatar.jpg?url";
export default {
  props: {
    data: {
      type: Object,
      /**
       * The example data of user send mail
       */
      default() {
        return {
          fromUser: {
            avatar: avatarUser,
            name: "",
            email: "khuonmatdangthuong45@gmail.com",
          },
          message: "",
          send_at: new Date().getTime(), // Timestamp millisecond
        };
      },
    },
  },
  computed: {
    currentTime() {
      return this.moment(this.data.fromUser.send_at).format("hh:mm");
    },
  },
};
</script>
