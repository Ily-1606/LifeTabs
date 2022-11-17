<template>
  <UModal :is-open="isOpen" @close-modal="$emit('closeModal')">
    <template #header> Cài đặt </template>
    <template #body>
      <div class="my-6 space-y-4">
        <div v-if="isLoading" class="flex items-center justify-center">
          <div class="text-center">
            <VueFontAwesome
              icon="fa-solid fa-spinner-third"
              class="w-8 h-8 fill-blue-500 cursor-pointer animate-spin mx-auto"
            />
            <div class="mt-4">Vui lòng đợi...</div>
          </div>
        </div>
        <template v-else>
          <div class="flex items-center gap-x-4">
            <div class="flex-none">
              <Switch
                v-model="userConfig.backgroundUpdate"
                :class="
                  userConfig.backgroundUpdate ? 'bg-blue-600' : 'bg-blue-300'
                "
                class="relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span class="sr-only">Tự động cập nhật dưới nền</span>
                <span
                  :class="
                    userConfig.backgroundUpdate
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  "
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                />
              </Switch>
            </div>
            <div
              class="flex-auto cursor-pointer"
              @click="
                userConfig.backgroundUpdate = !userConfig.backgroundUpdate
              "
            >
              Tự động cập nhật dưới nền
            </div>
          </div>
          <div class="flex gap-x-4 items-center">
            <div class="flex-none">
              <UnitSwitch v-model="userConfig.temp" :options="temps" />
            </div>
            <div class="flex-auto">
              Đơn vị nhiệt độ: {{ getUnitText(userConfig.temp, temps) }}
            </div>
          </div>
          <div class="flex gap-x-4 items-center">
            <div class="flex-none">
              <UnitSwitch v-model="userConfig.windy" :options="winds" />
            </div>
            <div class="flex-auto">
              Đơn vị tốc độ gió: {{ getUnitText(userConfig.windy, winds) }}
            </div>
          </div>
          <div class="flex gap-x-4 items-center">
            <div class="flex-none">
              <UnitSwitch v-model="userConfig.precip" :options="precips" />
            </div>
            <div class="flex-auto">
              Đơn vị lượng mưa đo được:
              {{ getUnitText(userConfig.precip, precips) }}
            </div>
          </div>
          <div class="flex gap-x-4 items-center">
            <div class="flex-none">
              <UnitSwitch v-model="userConfig.pressure" :options="pressures" />
            </div>
            <div class="flex-auto">
              Áp suất không khí:
              {{ getUnitText(userConfig.pressure, pressures) }}
            </div>
          </div>
        </template>
      </div>
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
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="$emit('closeModal')"
        >
          Hoàn tất
        </button>
      </div>
    </template>
  </UModal>
</template>
<script>
import UModal from "./UModal.vue";
import { Switch } from "@headlessui/vue";
import UnitSwitch from "../Switch/UnitSwitch.vue";
export default {
  components: {
    UModal,
    Switch,
    UnitSwitch,
  },
  mixins: [UModal],
  data() {
    return {
      isLoading: true,
      userConfig: {
        backgroundUpdate: true,
        temp: "c",
        windy: "kph",
        pressure: "in",
        precip: "mm",
      },
      temps: [
        {
          text: "°C",
          value: "c",
        },
        {
          text: "°F",
          value: "f",
        },
      ],
      winds: [
        {
          text: "km/h",
          value: "kph",
        },
        {
          text: "mph",
          value: "mph",
        },
      ],
      precips: [
        {
          text: "inch",
          value: "in",
        },
        {
          text: "mm",
          value: "mm",
        },
      ],
      pressures: [
        {
          text: "mbar",
          value: "mb",
        },
        {
          text: "inHg",
          value: "in",
        },
      ],
    };
  },
  methods: {
    async getLocation() {
      const res = await this.$store.dispatch("weather/fetchUserSetting");
      this.userConfig = {
        ...this.userConfig,
        ...(res?.data.unit.current_setting?.unit ?? {}),
      };
    },
    getUnitText(unit, options) {
      const option = options.find((_) => _.value === unit);
      return option?.text ?? "";
    },
  },
  created() {
    this.getLocation().then(() => {
      this.isLoading = false;
      this.$watch(
        "userConfig",
        (value, oldValue, onCleanup) => {
          const controller = new AbortController();
          this.$store
            .dispatch("weather/updateUnit", {
              payload: {
                unit: value,
              },
              options: {
                signal: controller.signal,
              },
            })
            .then(() => {
              this.$store.dispatch("weather/fetchUserSetting");
            });
          onCleanup(() => controller.abort());
        },
        {
          deep: true,
        }
      );
    });
  },
};
</script>
