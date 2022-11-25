<script>
import { useVuelidate } from "@vuelidate/core";
import ModalAddEvent from "./ModalAddEvent.vue";

export default {
  extends: ModalAddEvent,
  setup: () => ({ v$: useVuelidate() }),
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: "Sửa sự kiện",
      formData: {
        name: "",
        description: "",
        date: "",
        full_date: "",
        type_time: 1,
        schedule: 1,
      },
    };
  },
  methods: {
    sendData(data) {
      this.$store
        .dispatch("event/updateEvent", {
          payload: data,
        })
        .then(() => {
          this.$store.dispatch("event/getEvents");
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
