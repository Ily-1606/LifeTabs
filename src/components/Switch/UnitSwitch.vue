<template>
  <div
    class="relative inline-flex items-center rounded-full bg-slate-300 text-sm cursor-pointer"
  >
    <div
      class="px-3 py-[3px] transition-all duration-500"
      v-for="(option, index) in props.options"
      :key="index"
      :class="{
        'rounded-l-full': index === 0,
        'rounded-r-full': index === props.options.length - 1,
        'bg-blue-600 text-white': option.value === props.modelValue,
      }"
      @click="emits('update:modelValue', option.value)"
    >
      {{ option.text }}
    </div>
  </div>
</template>
<script setup>
/**
 * Props:
 * {
    options: {
      type: Array,
      required: true,
      default: [
        {
          text: "in",
          value: "in",
        },
        {
          text: "mb",
          value: "mb",
        },
      ],
    },
  }
 */
const props = defineProps(["modelValue", "options"]);
const emits = defineEmits(["update:modelValue"]);
</script>
