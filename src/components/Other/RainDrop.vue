<template>
  <div
    class="drop-rain group fill-slate-500 group cursor-pointer"
    @click="emits('open')"
  >
    <VueFontAwesome
      icon="fa-light fa-plus"
      class="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-md group-hover:fill-slate-50 group-hover:rotate-180 transition-transform duration-500"
    />
  </div>
</template>
<script setup>
const emits = defineEmits(["open"]);
</script>
<style scoped>
.drop-rain {
  --color: #eaeaeb;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  transform: translateY(-35px);
  background-color: var(--color);
  border: 6px solid var(--color);
}
.drop-rain:hover {
  --color: rgb(96 165 250);
}
.drop-rain::before {
  content: "";
  position: absolute;
  left: -22px;
  top: 30px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-right-radius: 20px;
  box-shadow: 1px -10px var(--color);
}
.drop-rain::after {
  content: "";
  position: absolute;
  right: -22px;
  top: 30px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-left-radius: 20px;
  box-shadow: -1px -10px var(--color);
}
</style>
