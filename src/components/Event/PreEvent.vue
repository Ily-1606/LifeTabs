<script>
import EventNear from "./EventNear.vue";
export default {
  extends: EventNear,
  computed: {
    listEvent() {
      return this.$store.getters.get("events", "event");
    },
    eventNear() {
      return this.$store.getters.get("nextEvent", "event");
    },
    nextEvent() {
      const index =
        this.listEvent?.findIndex((_) => _.id === this.eventNear.id) ?? 0;
      return this.listEvent[index - 1] ?? {};
    },
  },
  data() {
    return {
      direction: -1,
    };
  },
};
</script>
