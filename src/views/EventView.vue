<template>
  <div>
    <div class="min-h-screen min-w-screen flex px-6 justify-between">
      <div
        class="flex flex-col flex-none w-[350px] space-y-8 h-screen py-6 overflow-hidden sticky top-0"
      >
        <div class="flex-none">
          <div class="flex-none space-y-2">
            <div>Sự kiện vừa diễn ra</div>
            <PreEvent />
          </div>
        </div>
        <div class="flex-auto flex flex-col overflow-hidden"></div>
      </div>
      <div class="flex-auto max-w-[600px] space-y-10 pb-[100px]">
        <div class="w-max mx-auto sticky top-0">
          <RainDrop @open="isOpenModalAddEvent = true" />
        </div>
        <CountDown class="space-y-2">
          <template #name="{ data }">
            <div class="text-center mx-auto text-2xl">{{ data }}</div>
          </template>
          <template #description="{ data }">
            <div class="text-center mx-auto text-sm">{{ data }}</div>
          </template>
          <template #time="{ data }">
            <div class="text-center mx-auto">{{ data }}</div>
          </template>
        </CountDown>
        <div class="space-y-2">
          <div>Các sự kiện của bạn</div>
          <div class="flex flex-wrap gap-7" v-auto-animate>
            <div
              class="px-4 py-4 border border-blue-400 rounded-md cursor-pointer relative"
              v-for="event in userEvents"
              :key="event.id"
              @click="handlerOpenEditModal(event)"
            >
              <div>
                {{ event.date }}
              </div>
              <div class="flex items-center gap-x-6">
                <div class="flex-none">
                  <VueFontAwesome icon="fa-light fa-calendar" class="w-6 h-6" />
                </div>
                <div class="flex-auto">
                  <div class="text-xl">
                    {{ event.name }}
                  </div>
                  <div class="text-sm">
                    {{ event.description }}
                  </div>
                </div>
              </div>
              <div
                class="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full"
                @click.stop="deleteEvent(event)"
              >
                <VueFontAwesome
                  icon="fa-regular fa-xmark"
                  class="w-2 h-2 fill-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-none w-[350px] space-y-6 py-6 sticky top-0 h-screen">
        <div class="flex-none space-y-2">
          <div>Sự kiện kế tiếp</div>
          <NextEvent />
        </div>
      </div>
    </div>
    <ModalAddEvent
      :is-open="true"
      v-if="isOpenModalAddEvent"
      @close-modal="isOpenModalAddEvent = false"
    />
    <ModalEditEvent
      :is-open="true"
      :data="dataCurrentEdit"
      v-if="isOpenModalEditEvent"
      @close-modal="isOpenModalEditEvent = false"
    />
  </div>
</template>
<script setup>
import CountDown from "~/components/Event/CountDown.vue";
import RainDrop from "~/components/Other/RainDrop.vue";
import NextEvent from "~/components/Event/NextEvent.vue";
import PreEvent from "~/components/Event/PreEvent.vue";
import ModalAddEvent from "~/components/Modal/ModalAddEvent.vue";
import ModalEditEvent from "~/components/Modal/ModalEditEvent.vue";
import { useStore } from "vuex";
import { ref, computed } from "@vue/reactivity";
const store = useStore();
const isOpenModalAddEvent = ref(false);
const isOpenModalEditEvent = ref(false);
const dataCurrentEdit = ref({});
store.dispatch("event/getEventCached");
const userEvents = computed(() => {
  const events = store.getters.get("events", "event") ?? [];
  return events.filter((event) => {
    return event.userId;
  });
});
const handlerOpenEditModal = (data) => {
  dataCurrentEdit.value = data;
  isOpenModalEditEvent.value = true;
};
const deleteEvent = (event) => {
  store
    .dispatch("event/deleteEvent", {
      params: {
        id: event.id,
      },
    })
    .then(() => {
      store.dispatch("event/getEvents");
    })
    .finally(() => {
      // this.isLoading = false;
    });
};
</script>
