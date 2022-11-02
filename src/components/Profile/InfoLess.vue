<template>
  <div class="flex items-center space-x-4 justify-center">
    <div>
      <img :src="userInfo.avatar" class="w-12 h-12 rounded-full" />
    </div>
    <div class="font-semibold text-lg">
      {{ userInfo.fullName }}
    </div>
  </div>
</template>
<script>
import avatarUser from "~/assets/images/avatar.jpg?url";
export default {
  computed: {
    userInfo() {
      return {
        avatar: avatarUser,
        fullName: "Tường Nguyên",
      };
      // return this.$store.getters.get("userInfo");
    },
  },
};
</script>
