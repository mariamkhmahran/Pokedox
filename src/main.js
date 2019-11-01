import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import DetailsView from "./components/DetailsView/DetailsView";
import AsyncComputed from "vue-async-computed";
/* eslint-disable no-console */

Vue.use(AsyncComputed);
Vue.use(VueRouter);

const routes = [
  { path: "/home", component: Home },
  { path: "/pokemon/:ID", component: DetailsView, props: true }
];
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    getPokemon: async ID => {
      var pokemon;
      var desc;
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${ID}`).then(p => {
        pokemon = p.data;
      });
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${ID}`)
        .then(p => {
          desc = p.data.flavor_text_entries[1].flavor_text;
        });
      return { pokemon, desc };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.replace({ path: "/home", redirect: "/" });
