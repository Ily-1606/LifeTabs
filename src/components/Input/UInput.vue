<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="changeValue"
    :id="id"
    class="border p-2 border-sky-500 outline-none rounded"
  />
</template>
<script>
export default {
  props: {
    modelValue: {},
    id: {
      type: String,
      default() {
        return `input_${Math.round(
          (new Date().getTime() / 1000) * Math.random()
        )}`;
      },
    },
  },
  emits: ["update:modelValue"],
  methods: {
    changeValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
