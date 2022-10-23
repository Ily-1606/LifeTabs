<template>
  <div class="flex items-center justify-between relative">
    <div
      class="absolute top-1/2 -translate-y-1/2 h-1 bg-white border w-full rounded-md -z-0"
    ></div>
    <div
      v-for="index in totalStep"
      :key="index"
      class="flex relative items-center"
      :class="{
        'flex-auto': index != totalStep,
      }"
    >
      <div
        class="rounded-full w-7 h-7 flex items-center justify-center border-2 flex-none text-sm font-medium cursor-pointer"
        :class="[
          index <= currentStep
            ? 'bg-green-500 border-green-600 text-white'
            : 'bg-white',
        ]"
        @click="currentStep = index"
      >
        {{ index }}
      </div>
      <div
        class="h-1 border bg-green-500 relative -z-0 transition-all"
        v-if="index != totalStep"
        :class="[index < currentStep ? 'flex-auto' : 'flex-none']"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    totalStep: {
      step: Number,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      currentStep: this.modelValue,
    };
  },
  watch: {
    currentStep(value) {
      this.$emit("update:modelValue", value);
    },
    modelValue(value) {
      this.currentStep = value;
    },
  },
};
</script>
