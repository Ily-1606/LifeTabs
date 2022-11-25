import { createApp } from "vue";
import { directives } from "./utils/directive";
import App from "./App.vue";
const app = createApp(App);
/**
 * //TODO Using dynamic import to splitting code
 * Promise all to make sure all are libraries imported
 */

/**
 * Set directive to global app
 */
directives.forEach(({ name, handler }) => {
  app.directive(name, handler);
});
const handlers = Promise.all([
  import("./store"),
  import("./router"),
  import("@formkit/auto-animate/vue"),
  import("./utils/fontawesome"),
  import("./plugins/moment"),
  import("./plugins/lodash"),
  import("v-calendar"),
  import("./locales/locales"),
]);
handlers.then(
  ([
    store,
    router,
    animate,
    fontawesome,
    moment,
    lodash,
    VCalendar,
    locales,
  ]) => {
    app
      .use(store.default)
      .use(router.default)
      .use(animate.autoAnimatePlugin)
      .use(moment.default)
      .use(VCalendar.default, {})
      .use(locales.setupI18n())
      .use(lodash.default);
    fontawesome.setup(app);
    app.mount("#app");
  }
);

import "./utils/storage";
import "~/assets/css/main.css";
import "v-calendar/dist/style.css";
import("@lottiefiles/lottie-player");
