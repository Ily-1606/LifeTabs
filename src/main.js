import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
/**
 * //TODO Using dynamic import to splitting code
 * Promise all to make sure all are libraries imported
 */
const handlers = Promise.all([
  import("./store"),
  import("./router"),
  import("@formkit/auto-animate/vue"),
  import("./utils/fontawesome"),
  import("./plugins/moment"),
  import("./plugins/lodash"),
]);
handlers.then(([store, router, animate, fontawesome, moment, lodash]) => {
  app
    .use(store.default)
    .use(router.default)
    .use(animate.autoAnimatePlugin)
    .use(moment.default)
    .use(lodash.default);
  fontawesome.setup(app);
  app.mount("#app");
});

import "./utils/storage";
import "~/assets/css/main.css";
import("@lottiefiles/lottie-player");
