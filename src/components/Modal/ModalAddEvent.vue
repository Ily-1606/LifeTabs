<template>
  <UModal :is-open="isOpen" @close-modal="$emit('closeModal')">
    <template #header>{{ title }}</template>
    <template #body>
      <form @submit.prevent="submit" id="formShortcut">
        <div class="my-8">
          <div class="flex items-center justify-center">
            <UnitSwitch
              v-model="formData.type_time"
              :options="optionsTypeTime"
              size="md"
            />
          </div>
          <div class="mt-6">
            <MakodaInput
              custom-placeholder="Tên sự kiện"
              v-model="formData.name"
              :errors="v$.formData.name.$errors"
            />
          </div>
          <div class="mt-10">
            <MakodaInput
              custom-placeholder="Miêu tả"
              v-model="formData.description"
              tag="textarea"
            />
          </div>
          <div class="mt-6 space-y-2">
            <label>Thời gian</label>
            <v-date-picker class="h-full" v-model="formData.date">
              <template v-slot="{ inputValue, togglePopover }">
                <div class="flex items-center relative">
                  <button
                    type="button"
                    class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
                    @click="togglePopover()"
                  >
                    <VueFontAwesome
                      icon="fa-light fa-calendar"
                      class="w-4 h-4 fill-current"
                    />
                  </button>
                  <input
                    :value="inputValue"
                    @focus="togglePopover"
                    @blur="togglePopover"
                    class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-600 border-blue-500"
                  />
                  <div
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 fill-red-500 group"
                    v-if="v$.formData.date.$errors.length"
                  >
                    <div class="relative">
                      <VueFontAwesome icon="fa-regular fa-circle-exclamation" />
                      <UTooltip class="hidden group-hover:block">
                        <div
                          class="text-red-500 text-sm"
                          v-for="error in v$.formData.date.$errors"
                          :key="error"
                        >
                          {{ error.$message }}
                        </div>
                      </UTooltip>
                    </div>
                  </div>
                </div>
              </template>
            </v-date-picker>
          </div>
          <div class="mt-6 space-y-2">
            <label for="event_schedule">Lặp lại</label>
            <select
              class="w-full rounded-lg border border-blue-500 py-2 px-3"
              id="event_schedule"
              :v-model="formData.schedule"
            >
              <option
                v-for="option in optionsSchedule"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Đóng
        </button>
        <button
          class="inline-flex items-center gap-x-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:btn-blue-300 disabled:text-blue-500"
          form="formShortcut"
          :disabled="isLoading"
        >
          <VueFontAwesome
            v-if="isLoading"
            icon="fa-solid fa-spinner-third"
            class="w-4 h-4 fill-blue-500 cursor-pointer animate-spin"
          />
          Hoàn tất
        </button>
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";
import { required } from "@vuelidate/validators";
import MakodaInput from "../Input/MakodaInput.vue";
import { useVuelidate } from "@vuelidate/core";
import UnitSwitch from "../Switch/UnitSwitch.vue";
import UTooltip from "~/components/Tooltip/UTooltip.vue";
export default {
  components: {
    UModal,
    MakodaInput,
    UnitSwitch,
    UTooltip,
  },
  mixins: [UModal],
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      isLoading: false,
      formData: {
        name: "",
        description: "",
        date: "",
        type_time: 1,
        schedule: 1,
      },
      title: "Thêm sự kiện",
      optionsTypeTime: [
        {
          text: "Âm lịch",
          value: 0,
        },
        {
          text: "Dương lịch",
          value: 1,
        },
      ],
      optionsSchedule: [
        {
          text: "Sụ kiện thường niên",
          value: 1,
        },
        {
          text: "Sụ kiện hàng tháng",
          value: 2,
        },
        {
          text: "Sụ kiện hàng tuần",
          value: 3,
        },
        {
          text: "Sụ kiện hàng ngày",
          value: 4,
        },
        {
          text: "Tùy chỉnh",
          value: 5,
        },
      ],
    };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.isLoading = true;
      this.sendData();
    },
    sendData() {
      const data = { ...this.formData };
      data.date = `${data.date.getDate()}/${data.date.getMonth() + 1}`;
      this.$store
        .dispatch("event/addEvent", {
          payload: data,
        })
        .then(() => {
          this.$store.dispatch("event/getEvents");
          this.$emit("closeModal");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {},
  validations() {
    return {
      formData: {
        name: { required },
        date: { required },
        type_time: { required },
        schedule: { required },
      },
    };
  },
};
</script>
