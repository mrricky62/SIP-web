import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

import Login from "../views/auth/login.vue";
import ChangePassword from "../views/auth/change-password.vue";

import Dashboard from "@/views/dashboard/index.vue";
import Gaji from "@/views/gaji/index.vue";
import Tunjangan from "@/views/tunjangan/index.vue";
import UangMakan from "@/views/uang-makan/index.vue";
import SPD from "@/views/spd/index.vue";
import UangLembur from "@/views/uang-lembur/index.vue";
import Pegawai from "@/views/pegawai/index.vue";
import Summary from "@/views/summary/index.vue";
import Print from "@/views/summary/print.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/gaji",
    name: "Gaji",
    component: Gaji,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/tunjangan",
    name: "Tunjangan",
    component: Tunjangan,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/uang-makan",
    name: "UangMakan",
    component: UangMakan,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/spd",
    name: "SPD",
    component: SPD,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/uang-lembur",
    name: "UangLembur",
    component: UangLembur,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/pegawai",
    name: "Pegawai",
    component: Pegawai,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/print",
    name: "Print",
    component: Print,
    meta: {
      middleware: [auth],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") return next("/dashboard");
  return next();
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
