import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
createApp(App).use(router).use(store).mount("#app");
import "~/assets/css/main.css";
// Using dynamic import for spliting code
import("@lottiefiles/lottie-player");
