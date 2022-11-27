<template>
  <div class="space-y-8">
    <div class="" v-for="(groupMail, email) in listMailGroup" :key="email">
      <div class="mb-4">{{ email }}</div>
      <div class="space-y-2 u-panel p-4 rounded-xl">
        <MailRow v-for="(mail, index) in groupMail" :key="index" :data="mail" />
      </div>
    </div>
  </div>
</template>
<script>
import MailRow from "./_MailRow.vue";
import avatarUser from "~/assets/images/avatar.jpg?url";
export default {
  components: {
    MailRow,
  },
  data() {
    return {
      listMail: [
        {
          fromUser: {
            avatar: avatarUser,
            name: "Tường Nguyên",
            email: "ily1606@duck.com",
          },
          message: "Test",
          send_at: new Date().getTime(),
        },
        {
          fromUser: {
            avatar: avatarUser,
            name: "Tường Nguyên",
            email: "ily1606@duck.com",
          },
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, rerum molestiae voluptate tempore exercitationem eos minima. Veritatis voluptate corrupti rem iure sapiente dolor corporis aliquam reprehenderit, aspernatur, fugit, ad natus!",
          send_at: new Date().getTime(),
        },
        {
          fromUser: {
            avatar: avatarUser,
            name: "Tường Nguyên",
            email: "ily1606@ily1606.com",
          },
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, rerum molestiae voluptate tempore exercitationem eos minima. Veritatis voluptate corrupti rem iure sapiente dolor corporis aliquam reprehenderit, aspernatur, fugit, ad natus!",
          send_at: new Date().getTime(),
        },
        {
          fromUser: {
            avatar: avatarUser,
            name: "Tường Nguyên",
            email: "ily1606@ily1606.com",
          },
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, rerum molestiae voluptate tempore exercitationem eos minima. Veritatis voluptate corrupti rem iure sapiente dolor corporis aliquam reprehenderit, aspernatur, fugit, ad natus!",
          send_at: new Date().getTime(),
        },
      ],
      listMailGroup: [],
    };
  },
  created() {
    this.listMailGroup = this.lodash.groupBy(
      this.listMail,
      (_) => _.fromUser.email
    );
  },
};
</script>
