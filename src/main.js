import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import AsyncComputed from "vue-async-computed";

Vue.use(AsyncComputed);
Vue.use(VueRouter);

const routes = [{ path: "/home", component: Home }];
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.replace({ path: "/home", redirect: "/" });
