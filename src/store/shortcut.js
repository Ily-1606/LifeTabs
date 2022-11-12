const shortCutStore = {
  namespaced: true,
  state() {
    return {
      /**
       * Author: Ily1606
       * The list of shortcuts "base" (can't delete by user)
       * String: name: The name to displaying
       * String: action: The method to be called when user clicking into shortcut (load in @/mixins/shortcut.js)
       * String: icon: The icon to be loaded by vue fontawesome pro
       */
      baseShortcut: [
        {
          text: "Trang chủ",
          action: "toNewTab",
          icon: "fa-light fa-house-user",
          name: "home",
        },
        {
          text: "Thời tiết",
          action: "toWeather",
          icon: "fa-light fa-cloud-sun-rain",
          name: "weather",
        },
        {
          text: "Sự kiện",
          action: "toEvent",
          icon: "fa-light fa-calendar",
        },
        {
          text: "Phím tắt",
          action: "toShortcut",
          icon: "fa-light fa-keyboard",
        },
        {
          text: "Cài đặt",
          action: "toSetting",
          icon: "fa-light fa-gear",
        },
      ],
    };
  },
  getters: {},
  action: {},
};
export default shortCutStore;
