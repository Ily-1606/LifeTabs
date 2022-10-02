<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="changeValue"
    class="border p-2 border-sky-500 outline-none rounded"
  />
</template>
<script>
export default {
  props: {
    modelValue: {},
  },
  emits: ["update:modelValue"],
  methods: {
    changeValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
