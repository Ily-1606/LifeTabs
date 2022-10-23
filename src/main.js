import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
/**
 * //TODO Using dynamic import to spliting code
 * Promise all to make sure all are libraries imported
 */
const handlers = Promise.all([
  import("./store"),
  import("./router"),
  import("@formkit/auto-animate/vue"),
  import("./utils/fontawesome"),
  import("./utils/sentry"),
]);
handlers.then(([store, router, animate, fontawesome, sentry]) => {
  app.use(store.default).use(router.default).use(animate.autoAnimatePlugin);
  fontawesome.setup(app);
  sentry.SentryInit(app, router.default);
  app.mount("#app");
});
import "./utils/storage";
import "~/assets/css/main.css";
import("@lottiefiles/lottie-player");
