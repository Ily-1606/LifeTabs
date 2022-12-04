<template>
  <div>
    <div class="absolute inset-0 -z-10">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1366 605.17"
      >
        <path
          d="M694,0a487.25,487.25,0,0,0,55,184c4.59,8.6,54.83,100.55,151,170,188.26,136,421.32,91,464,82l1.56-436Z"
          style="fill: #cfe8ba"
        />
      </svg>
    </div>
    <div><FocusHeader /></div>
    <div class="max-w-5xl mx-auto mt-20 flex gap-x-10">
      <LeftSidebar class="w-60 flex-none" />
      <div class="flex-auto">
        <div class="mx-auto space-y-8">
          <TreePlant />
          <div class="text-center text-lime-700">
            Cây của bạn vẫn đang khỏe mạnh, hãy tiếp tục chăm sóc cây của bạn
            nào.
          </div>
          <div class="flex justify-center">
            <button class="btn-green py-3 px-8 rounded-full bg-lime-700">
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LeftSidebar from "~/components/Focus/LeftSidebar.vue";
import TreePlant from "~/components/Focus/TreePlant.vue";
import FocusHeader from "~/components/Headers/FocusHeader.vue";
</script>
