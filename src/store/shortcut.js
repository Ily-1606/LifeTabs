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
          name: "Trang chủ",
          action: "toNewTab",
          icon: "fa-light fa-house-user",
        },
        {
          name: "Thời tiết",
          action: "toWeather",
          icon: "fa-light fa-cloud-sun-rain",
        },
        {
          name: "Sự kiện",
          action: "toEvent",
          icon: "fa-light fa-calendar",
        },
        {
          name: "Phím tắt",
          action: "toShortcut",
          icon: "fa-light fa-keyboard",
        },
        {
          name: "Cài đặt",
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
