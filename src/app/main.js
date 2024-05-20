import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import components from "@/components/UI/index";

const pinia = createPinia();

const app = createApp(App);

components.forEach((component) => app.component(component.__name, component));

app.use(pinia).use(router).mount("#app");
