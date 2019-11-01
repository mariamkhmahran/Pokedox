<template>
  <div class="homeContainer">
    <Poke-Card :key="poke" v-for="poke in pokes" :pokemon="poke"></Poke-Card>
  </div>
</template>

<script>
import axios from "axios";
import PokeCard from "./PokeCard/PokeCard";

/* eslint-disable no-console */
async function getAllPokemons() {
  var pokes = [];
  await axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
    pokes = res.data.results;
  });
  return pokes;
}

export default {
  name: "home",
  components: {
    PokeCard
  },
  data: () => {
    return {
      pokes: []
    };
  },
  beforeMount() {
    getAllPokemons().then(p => (this.pokes = p));
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
  width: 80%;
  margin: auto;
  margin-top: 85px;
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

@media only screen and (max-width: 1200px) {
  .homeContainer {
    width: 97%;
  }
}
</style>