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
const cache = window.caches;

Vue.mixin({
  data() {
    return {
      next: "https://pokeapi.co/api/v2/pokemon/"
    };
  },
  methods: {
    async getPokemon(name, withDescription = false) {
      var pokemon = await this.getPokemonBaseData(name);
      var desc = withDescription
        ? await this.getPokemonDescription(name)
        : null;

      return {
        ...pokemon,
        desc
      };
    },
    getPokemonBaseData: async name => {
      var pokemon;
      var id;
      var spriteURL;
      var types;
      var abilities;
      var height;
      var weight;
      var baseExp;
      var stats;
      var url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      await cache
        .match(url, { cacheName: "pokedox", ignoreVary: true })
        .then(p => {
          if (p) {
            return p.json();
          } else {
            return axios.get(url);
          }
        })
        .then(async p => {
          pokemon = p.data ? p.data : p;
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

          await caches.open("pokedox").then(cache => cache.add(url));
        });
      return {
        pokemon,
        id,
        spriteURL,
        types,
        abilities,
        height,
        weight,
        baseExp,
        stats
      };
    },
    getPokemonDescription: async name => {
      var desc;
      var url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
      await cache
        .match(url, { cacheName: "pokedox", ignoreVary: true })
        .then(p => {
          if (p) {
            return p.json();
          } else {
            return axios.get(url);
          }
        })
        .then(async p => {
          p = p.data ? p.data : p;
          desc = p.flavor_text_entries.find(t => {
            return t.language.name === "en";
          }).flavor_text;

          await caches.open("pokedox").then(cache => cache.add(url));
        });
      return desc;
    },
    async loadNextPage() {
      var newPokemons;
      await cache
        .match(this.next, { cacheName: "pokedox", ignoreVary: true })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            return axios.get(this.next);
          }
        })
        .then(async res => {
          res = res.data ? res.data : res;
          newPokemons = res.results.map(pokemon => {
            return pokemon.name;
          });

          await caches.open("pokedox").then(cache => cache.add(this.next));
          this.next = res.data ? res.data.next : res.next;
        });
      return newPokemons;
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
