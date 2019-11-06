import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import DetailsView from "./components/DetailsView/DetailsView";
/* eslint-disable no-console */
/* eslint-disable no-unused-labels */

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/pokemon/:name", component: DetailsView, props: true }
];
const router = new VueRouter({ routes });

Vue.mixin({
  data() {
    return {
      next: "https://pokeapi.co/api/v2/pokemon/"
    };
  },
  methods: {
    getPokemon: async name => {
      var pokemon;
      var id;
      var desc;
      var spriteURL;
      var types;
      var abilities;
      var height;
      var weight;
      var baseExp;
      var stats;
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(p => {
        pokemon = p.data;
        id = pokemon.id;
        spriteURL = pokemon.sprites.front_default;
        types = pokemon.types.map(t => t.type.name);
        abilities = pokemon.abilities.map(t => t.ability.name);
        height = pokemon.height / 10;
        weight = pokemon.weight / 10;
        baseExp = pokemon.base_experience;
        stats = pokemon.stats.map(s => ({
          name: s.stat.name,
          value: s.base_stat
        }));
      });
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id} `)
        .then(p => {
          desc = p.data.flavor_text_entries.find(t => {
            return t.language.name === "en";
          }).flavor_text;
        });
      return {
        pokemon,
        id,
        desc,
        spriteURL,
        types,
        abilities,
        height,
        weight,
        baseExp,
        stats
      };
    },
    async loadNextPage() {
      var newPokemons;
      await axios.get(this.next).then(res => {
        this.next = res.data.next;
        newPokemons = res.data.results.map(pokemon => {
          return pokemon.name;
        });
      });
      return newPokemons;
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
