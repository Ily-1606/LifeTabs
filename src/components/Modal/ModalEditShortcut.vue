<script>
import ModalAddShortcut from "./ModalAddShortcut.vue";
import { useVuelidate } from "@vuelidate/core";
export default {
  extends: ModalAddShortcut,
  setup: () => ({ v$: useVuelidate() }),
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: "Sửa lối tắt",
    };
  },
  methods: {
    async sendData() {
      this.$store
        .dispatch("shortcut/editShortcut", {
          payload: this.formData,
          params: {
            id: this.formData.id,
          },
        })
        .then(() => {
          this.$store.dispatch("shortcut/getShortcut");
          this.$emit("closeModal");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.formData = {
      ...this.data,
    };
  },
};
</script>
