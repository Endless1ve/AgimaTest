import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";

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
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/CreatePostView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  const user = useUserStore();
  if (to.name === "login") {
    if (auth.isAuth) {
      return { name: "home" };
    } else return;
  }

  if (to.name === "create") {
    if (auth.isAuth && user.role === "writer") {
      return;
    } else return { name: "home" };
  }
});

router.addRoute({
  path: "/:pathMatch(.*)*",
  redirect: { name: "home" },
});

export default router;
