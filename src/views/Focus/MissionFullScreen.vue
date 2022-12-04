<template>
  <div
    class="w-screen h-screen flex flex-col gap-y-8 items-center justify-center bg-red-500 text-white"
  >
    <div class="w-96 h-96 relative">
      <svg viewBox="0 0 100 100" class="fill-slate-50 stroke-slate-50">
        <path
          d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
          fill-opacity="0"
          stroke-linecap="round"
          stroke-width="1px"
          style="
            stroke-dasharray: 295.31px;
            transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
          "
          :style="`stroke-dashoffset: ${295.31 * (1 - percent)}`"
        ></path>
      </svg>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-7xl"
      >
        {{ minute }}:{{ second }}
      </div>
    </div>
    <div class="text-xl">
      {{ message }}
    </div>
    <div class="grid grid-flow-col gap-x-16 fill-slate-50 items-center">
      <div class="w-12 h-12">
        <VueFontAwesome
          :icon="isPlaying ? 'fa-light fa-pause' : 'fa-light fa-play'"
          class="w-full h-full cursor-pointer"
          @click="togglePlay"
        />
      </div>
      <div class="w-12 h-12">
        <VueFontAwesome
          icon="fa-light fa-stop"
          class="w-full h-full cursor-pointer"
          @click="stop"
        />
      </div>
      <div class="w-12 h-12">
        <VueFontAwesome
          icon="fa-light fa-pencil"
          class="w-full h-full cursor-pointer"
          @click="isOpenModalEdit = true"
        />
      </div>
    </div>
    <ModalFocusFullScreenEdit
      :is-open="true"
      v-if="isOpenModalEdit"
      @close-modal="isOpenModalEdit = false"
    >
      <template #optionSound>
        <div class="space-y-3">
          <div class="flex space-x-3">
            <div class="flex-none">
              <Switch
                v-model="isPlaySound"
                :class="isPlaySound ? 'bg-blue-600' : 'bg-blue-300'"
                class="relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span
                  :class="isPlaySound ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                />
              </Switch>
            </div>
            <div class="flex-none">
              <div>Cho phép âm thanh nền</div>
            </div>
          </div>
          <div>
            <div class="mb-2">Âm thanh nền:</div>
            <select
              v-model="currentSound"
              class="w-full border rounded-lg py-2 px-4"
            >
              <option
                :value="option.value"
                v-for="option in optionSounds"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </template>
      <template #message>
        <MakodaInput custom-placeholder="Ghi chú" v-model="message" />
      </template>
    </ModalFocusFullScreenEdit>
    <audio
      hidden
      :src="listSound[currentSound]"
      autoplay
      loop
      ref="audioController"
    />
  </div>
</template>
<script setup>
import { computed, ref } from "@vue/reactivity";
import { estimatedMinutes, estimatedSeconds } from "~/utils/event";
import ModalFocusFullScreenEdit from "~/components/Modal/ModalFocusFullScreenEdit.vue";
import { Switch } from "@headlessui/vue";
import MakodaInput from "~/components/Input/MakodaInput.vue";
import { watch } from "@vue/runtime-core";
const listSound = ref([
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/forest.mp3",
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/ocean.mp3",
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/rain.mp3",
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/peace.mp3",
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/cafe.mp3",
]);
const optionSounds = ref([
  {
    value: 0,
    text: "Forest",
  },
  {
    value: 1,
    text: "Ocean",
  },
  {
    value: 2,
    text: "Rain",
  },
  {
    value: 3,
    text: "Peace",
  },
  {
    value: 4,
    text: "Cafe",
  },
]);
const minute = ref(25);
const second = ref(59);
const isPlaying = ref(true);
const isOpenModalEdit = ref(false);
const isPlaySound = ref(true);

const markTime = ref(25 * 60);
const markTimeStart = ref(25 * 60);
const currentSound = ref(0);
const message = ref("");
const updateTime = () => {
  const minuteTime = estimatedMinutes(markTime.value * 1000);
  const secondTime = estimatedSeconds(markTime.value * 1000);
  minute.value = minuteTime >= 10 ? minuteTime : `0${minuteTime}`;
  second.value = secondTime >= 10 ? secondTime : `0${secondTime}`;
  markTime.value -= 1;
};
const percent = computed(() => {
  return markTime.value / markTimeStart.value;
});
let timer;
const play = () => {
  updateTime();
  isPlaying.value = true;
  timer = setInterval(() => {
    if (markTime <= 0) clearInterval(timer);
    updateTime();
  }, 1000);
};
const paused = () => {
  clearInterval(timer);
  isPlaying.value = false;
};
const stop = () => {
  markTime.value = markTimeStart.value;
};
const togglePlay = () => {
  if (isPlaying.value) paused();
  else play();
};
if (isPlaying.value) play();
const audioController = ref();
watch(isPlaySound, () => {
  audioController.value.muted = !isPlaySound.value;
});
</script>
