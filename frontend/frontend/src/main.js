import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ResizeTextarea from "resize-textarea-vue3";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";
// import records from "./store/modules/records";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);
app.use(ResizeTextarea);
app.use(store);
// app.use(records);

app.mount("#app");
// createApp(App).use(router).mount("#app");
