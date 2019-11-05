<template>
  <div :class="{sideContainer:this.side, mainContainer:!this.side}" class="homeContainer">
    <Poke-Card :side="side" :key="i" v-for="(id, i) in IDs" :ID="id"></Poke-Card>
  </div>
</template>

<script>
import axios from "axios";
import PokeCard from "./PokeCard/PokeCard";

export default {
  name: "home",
  components: {
    PokeCard
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
    this.getPokemonsIDs("https://pokeapi.co/api/v2/pokemon").then(() => {
      if (document.querySelector(".sideContainer"))
        document
          .querySelector(".sideContainer")
          .addEventListener("scroll", this.sideScroll);
      window.onscroll = this.scroll;
    });
  },
  methods: {
    async getPokemonsIDs(url) {
      await axios.get(url).then(res => {
        this.next = res.data.next;
        var newIDS = res.data.results.map(pokemon => {
          var num = pokemon.url.split("/");
          return num[num.length - 2];
        });
        var arr = this.IDs.value ? [] : this.IDs;
        this.IDs = arr.concat(newIDS);
      });
    },
    scroll() {
      let bottomOfWindow =
        window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
      if (bottomOfWindow) {
        this.getPokemonsIDs(this.next);
      }
    },
    sideScroll() {
      var cont = document.querySelector(".sideContainer");
      let bottomOfWindow =
        cont.scrollTop >= cont.scrollHeight - cont.offsetHeight;
      if (bottomOfWindow) {
        this.getPokemonsIDs(this.next);
      }
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
  overflow: visible;
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

  .sideContainer {
    width: 30%;
  }
}

@media only screen and (max-width: 800px) {
  .sideContainer {
    visibility: hidden;
  }
}
</style>