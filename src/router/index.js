import { createRouter, createWebHashHistory } from "vue-router";
const HomeView = import("../views/HomeView.vue");
const WeatherView = import("../views/WeatherView.vue");
const FocusGettingStartedView = import("../views/Focus/GettingStartedView.vue");
const FocusHome = import("../views/Focus/FocusView.vue");
const ShortcutView = import("../views/ShortcutView.vue");
const EventView = import("../views/EventView.vue");

import { onlyGuest, onlyUser } from "~/middleware/auth/checkUser";

const handlerMiddlewares = (middlewares, next) => {
  let result = true;
  for (let middleware of middlewares) {
    if (!middleware()) {
      result = false;
      break;
    }
  }
  if (result) {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => HomeView,
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyUser.bind(null, () => {
          return next({ name: "welcome" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
    meta: {
      layout: "user",
      active: "home",
    },
  },
  {
    path: "/weather",
    name: "weather",
    component: () => WeatherView,
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyUser.bind(null, () => {
          return next({ name: "welcome" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
    meta: {
      layout: "user",
      active: "weather",
    },
  },
  {
    path: "/shortcut",
    name: "shortcut",
    component: () => ShortcutView,
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyUser.bind(null, () => {
          return next({ name: "welcome" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
    meta: {
      layout: "user",
      active: "shortcut",
    },
  },
  {
    path: "/event",
    name: "event",
    component: () => EventView,
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyUser.bind(null, () => {
          return next({ name: "welcome" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
    meta: {
      layout: "user",
      active: "event",
    },
  },
  {
    path: "/focus",
    name: "focus",
    children: [
      {
        name: "focusHome",
        path: "",
        component: () => FocusHome,
      },
      {
        name: "focusGettingStarted",
        path: "getting-started",
        component: () => FocusGettingStartedView,
      },
    ],
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyUser.bind(null, () => {
          return next({ name: "welcome" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
    meta: {
      layout: "focus",
      active: "focus",
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("../views/WelcomeView.vue"),
    beforeEnter: function (to, from, next) {
      const middlewares = [
        onlyGuest.bind(null, () => {
          return next({ name: "home" });
        }),
      ];
      handlerMiddlewares(middlewares, next);
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
