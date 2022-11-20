<template>
  <div>
    <div class="min-h-screen min-w-screen flex px-6 justify-between">
      <div
        class="flex flex-col flex-none w-[350px] space-y-8 h-screen py-6 overflow-hidden sticky top-0"
      >
        <div class="flex-none"></div>
        <div class="flex-auto flex flex-col overflow-hidden"></div>
      </div>
      <div class="flex-auto max-w-[600px] space-y-10 py-6 pb-[100px]">
        <CountDown class="space-y-2">
          <template #name="{ data }">
            <div class="text-center mx-auto text-2xl">{{ data }}</div>
          </template>
          <template #time="{ data }">
            <div class="text-center mx-auto">{{ data }}</div>
          </template>
        </CountDown>
      </div>
      <div
        class="flex-none w-[350px] space-y-6 py-6 sticky top-0 h-screen"
      ></div>
    </div>
  </div>
</template>
<script setup>
import CountDown from "~/components/Event/CountDown.vue";
</script>
