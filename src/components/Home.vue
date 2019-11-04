<template>
  <div :class="{sideContainer:this.side, mainContainer:!this.side}" class="homeContainer">
    <Poke-Card :side="side" :key="i" v-for="(id, i) in IDs" :ID="id"></Poke-Card>
    <scroll-loader :loader-method="getMorePokemons" :loader-enable="loadMore">
      <div>Loading...</div>
    </scroll-loader>
  </div>
</template>

<script>
import axios from "axios";
import PokeCard from "./PokeCard/PokeCard";
import ScrollLoader from "vue-scroll-loader";
/* eslint-disable no-console */

export default {
  name: "home",
  components: {
    PokeCard,
    ScrollLoader
  },
  props: {
    side: Boolean
  },
  data: () => {
    return {
      loadMore: true,
      IDs: [],
      next: ""
    };
  },
  beforeMount() {
    this.getPokemonsData("https://pokeapi.co/api/v2/pokemon");
  },
  methods: {
    getPokemonsData(url) {
      axios.get(url).then(res => {
        this.next = res.next;
        this.IDs = res.data.results.map(pokemon => {
          var num = pokemon.url.split("/");
          return num[num.length - 2];
        });
      });
    },
    getMorePokemons() {
      console.log("here");

      this.getPokemonsData(this.next);
    }
  }
};
</script>

<style scoped>
.homeContainer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: auto;
  overflow: scroll;
}
.mainContainer {
  width: 80%;
  margin-top: 85px;
}

.sideContainer {
  position: fixed;
  top: 85px;
  left: 20px;
  bottom: 10px;
  width: 46%;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

@media only screen and (max-width: 1200px) {
  .mainContainer {
    width: 97%;
  }
}
</style>