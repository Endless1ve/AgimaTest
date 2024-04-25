import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/store/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  if (to.name === "login") {
    if (auth.isAuth) {
      return { name: "home" };
    } else return;
  }
});

router.addRoute({
  path: "/:pathMatch(.*)*",
  redirect: { name: "home" },
});

export default router;
