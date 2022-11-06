import { createRouter, createWebHashHistory } from "vue-router";
const HomeView = import("../views/HomeView.vue");
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
