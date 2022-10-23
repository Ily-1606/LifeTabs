<template>
  <div
    ref="tooltip"
    class="absolute z-10 bg-white min-w-max left translate-x-9 border border-red-300 -translate-y-1/2 top-1/2"
  >
    <div class="relative">
      <div class="w-full p-4">
        <slot />
      </div>
      <VueFontAwesome
        icon="fa-solid fa-caret-left"
        class="absolute w-4 h-4 top-1/2 -left-3 z-20 fill-red-300 -translate-y-1/2"
      />
    </div>
  </div>
</template>
<script>
export default {};
</script>
