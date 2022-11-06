<template>
  <router-view v-slot="{ Component }">
    <transition
      leave-to-class="opacity-0 transition-all absolute duration-[0ms]"
      enter-from-class="opacity-0 transition-all absolute duration-[1000ms]"
      enter-to-class="opacity-1 transition-all duration-[1000ms]"
      :duration="500"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style></style>
