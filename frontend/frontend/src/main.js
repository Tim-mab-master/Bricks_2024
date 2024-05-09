import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ResizeTextarea from "resize-textarea-vue3";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vue3GoogleLogin from "vue3-google-login";
import Vuex from "vuex";
import store from "./store.js";
// import VueAxios from "vue-axios";
// import axios from "axios";

// 导入 Element Plus 的图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import "material-design-icons/iconfont/material-icons.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册 Element Plus 的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const CLIENT_ID =
  "220283758913-46ag6g0ah3cunpiahpu4pm8m7c21if1l.apps.googleusercontent.com";
app.use(vue3GoogleLogin, {
  clientId: CLIENT_ID,
  // scope: "email",
  // prompt: "consent",
});

// router.beforeEach((to, from, next) => {
//   let getFlag = localStorage.getItem("Flag");
//   let getid = localStorage.getItem("account");
//   if (getFlag === "isLogin" && getid !== null) {
//     store.state.isLogin = true;
//     next();
//   }
// });
// router.afterEach(() => {
//   window.scroll(0, 0);
// });

app.use(ElementPlus);
app.use(router);
app.use(ResizeTextarea);
app.use(Vuex);
// app.use(VueAxios);
// app.use(VueAxios, axios);
app.use(store);
app.mount("#app");
// createApp(App).use(router).mount("#app");
