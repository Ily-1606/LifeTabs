<template>
  <div class="flex items-end h-screen justify-between">
    <div class="absolute inset-0 -z-10">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1366 605.17"
      >
        <path
          d="M266,0c7.14,15.82,158.12,333.37,553.22,391.34,286,42,503.81-80.83,546.78-106.13L1365.6,0Z"
          style="fill: #cfe8ba"
        />
      </svg>
    </div>
    <div class="px-10 box-content py-20 w-[450px]">
      <div class="text-lime-500 font-bold text-6xl">Forest</div>
      <div class="font-bold text-5xl mt-4">
        <p>“Stay focused,</p>
        <p>Be present”</p>
      </div>
      <div class="mt-10">
        Mặc dù đang làm bất cứ công việc gì, quan trọng hay không quan trọng,
        hãy cứ tập trung vào thời điểm đó.
      </div>
      <div class="mt-8">
        <button class="bg-lime-500 rounded-full text-white uppercase py-2 px-6">
          Bắt đầu
        </button>
      </div>
    </div>
    <div class="px-40 py-20">
      <div class="w-[450px] h-[450px] rounded-full relative">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-slate-500"
        >
          <rect
            width="100%"
            height="100%"
            fill="none"
            rx="100%"
            ry="100%"
            stroke-width="2"
            stroke-dasharray="10, 30"
            stroke-dashoffset="0"
            stroke-linecap="square"
          />
        </svg>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img :src="imageCenter" class="w-40 h-40 rounded-full" />
        </div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img :src="listImages[0].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-[18%] left-[40px] -translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[1].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-1/2 left-[0px] -translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[2].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-[82%] left-[40px] -translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[3].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[4].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-[82%] right-[40px] translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[5].image" class="w-20 h-20 rounded-full" />
        </div>
        <div class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <img :src="listImages[6].image" class="w-20 h-20 rounded-full" />
        </div>
        <div
          class="absolute top-[18%] right-[40px] translate-x-1/2 -translate-y-1/2"
        >
          <img :src="listImages[7].image" class="w-20 h-20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import image0 from "~/assets/images/focus/getting_started/0.jpg?url";
import image1 from "~/assets/images/focus/getting_started/1.jpg?url";
import image2 from "~/assets/images/focus/getting_started/2.jpg?url";
import image3 from "~/assets/images/focus/getting_started/3.jpg?url";
import image4 from "~/assets/images/focus/getting_started/4.jpg?url";
import image5 from "~/assets/images/focus/getting_started/5.jpg?url";
import image6 from "~/assets/images/focus/getting_started/6.jpg?url";
import image7 from "~/assets/images/focus/getting_started/7.jpg?url";
import imageCenter from "~/assets/images/focus/getting_started/center.jpg?url";
const listImages = ref([
  {
    image: image0,
  },
  {
    image: image1,
  },
  {
    image: image2,
  },
  {
    image: image3,
  },
  {
    image: image4,
  },
  {
    image: image5,
  },
  {
    image: image6,
  },
  {
    image: image7,
  },
]);
</script>
