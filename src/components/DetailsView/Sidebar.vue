<template>
  <div class="main">
    <div v-if="!loading" class="sidebar">
      <div class="row">
        <img id="sprite" :src="spriteURL" />
        <div class="col" style="width: 48%">
          <span id="pokeNumber">{{pokeNumber}}</span>
          <span id="pokeName">
            <b>{{pokeName}}</b>
          </span>
          <span class="desc data">{{desc}}</span>
          <div class="row types">
            <Tag :key="type" v-for="type in types" :type="type" details id="tags" />
          </div>
        </div>
      </div>
      <div class="row detail">
        <div class="col detail border">
          <span id="value">
            <b>{{height}} m</b>
          </span>
          <span id="param">HEIGHT</span>
        </div>
        <div class="col detail border">
          <span id="value">
            <b>{{weight}} kg</b>
          </span>
          <span id="param">WEIGHT</span>
        </div>
        <div class="col detail">
          <span id="value">
            <b>{{baseExp}}</b>
          </span>
          <span id="param">BASE EXP</span>
        </div>
      </div>
      <div class="row stats">
        <stats :key="stat.name" v-for="stat in stats" :param="stat.name" :value="stat.value" />
      </div>
      <div class="row evolutions">
        <span id="evolutionsParam">
          <b>Evolutoin Chain:</b>
        </span>
        <span
          :key="evol.name"
          v-for="evol in evolutionChain"
          @click="()=>{showEvol(evol.name)}"
          id="evolutions"
        >{{evol.name}}</span>
      </div>
    </div>
    <img v-show="loading" src="../../assets/loadingImage.png" class="loading" />
  </div>
</template>

<script>
import Tag from "../Tag";
import Stats from "./Stats";

export default {
  components: {
    Tag,
    Stats
  },
  props: ["name"],
  data: () => {
    return {
      loading: true,
      pokemon: null,
      ID: "",
      pokeName: "",
      desc: "",
      spriteURL: "",
      types: [],
      evolutionChain: [],
      height: 0,
      weight: 0,
      baseExp: 0,
      stats: []
    };
  },
  created() {
    this.loadPokemon();
  },
  computed: {
    pokeNumber() {
      var num = "" + this.ID;
      while (num.length < 3) {
        num = "0" + num;
      }
      return "#" + num;
    }
  },
  watch: {
    name() {
      this.loading = true;
      this.loadPokemon();
    }
  },
  methods: {
    loadPokemon() {
      this.getPokemon(this.name, true).then(
        ({
          pokemon,
          id,
          desc,
          spriteURL,
          types,
          evolutionChain,
          height,
          weight,
          baseExp,
          stats
        }) => {
          this.pokemon = pokemon;
          this.ID = id;
          this.desc = desc;
          this.spriteURL = spriteURL;
          this.types = types;
          this.evolutionChain = evolutionChain;
          this.height = height;
          this.weight = weight;
          this.baseExp = baseExp;
          this.stats = stats;
          this.loading = false;
        }
      );
    },
    showEvol(newName) {
      if (newName != this.name)
        this.$router.replace({ path: `/pokemon/${newName}` });
    }
  }
};
</script>

<style scoped>
.loading {
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46%;
  height: 80vh;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: fixed;
  top: 100px;
  right: 40px;
  padding: 20px;
}

.sidebar {
  /* display: flex;
  flex-direction: column; */
  transition: all 0.2s ease-in-out;
  transition: 0.3s;
}

#sprite {
  object-fit: cover;
  width: 44%;
  height: 280px;
  margin: 15px;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(150, 148, 148, 0.185);
  box-shadow: 0 2px 8px 0 rgba(255, 90, 96, 0.37);
}

.data {
  color: rgb(141, 140, 140);
  margin: 0 0 10px 15px;
  font-size: 25px;
}

.desc {
  font-size: 20px;
  width: 100%;
  height: 140px;
  text-overflow: ellipsis;
}

.data.desc {
  margin: 0 0 0px 15px;
}

#pokeNumber {
  color: rgb(141, 140, 140);
  margin: 20px 0px 5px 15px;
  font-size: 25px;
}

#pokeName {
  color: black;
  font-size: 39px;
  margin: 0px 0px 10px 15px;
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.row.detail {
  margin-top: 30px;
  justify-content: space-around;
}

.col.detail {
  justify-content: center;
  align-items: center;
  width: 31%;
}

.col.border {
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: rgba(128, 128, 128, 0.651);
}

#value {
  font-size: 22px;
  color: black;
}

#param {
  font-size: 18px;
  color: rgb(141, 140, 140);
  margin-top: 2px;
}

.types {
  margin: 10px 20px;
}

.row.types {
  width: 32%;
  justify-content: space-between;
}

.row.stats {
  margin: 30px 0 0 0;
  flex-wrap: wrap;
  justify-content: space-around;
}

.row #evolutions {
  margin-left: 5px;
  font-size: 18px;
  color: rgb(141, 140, 140);
  cursor: pointer;
  text-decoration: underline;
}

#evolutions:not(:last-child):after {
  content: ", ";
}

#evolutionsParam {
  font-size: 18px;
  color: black;
  margin-top: 2px;
  margin-right: 3px;
}

.row.evolutions {
  align-items: center;
  margin: 20px 35px 0;
}

@media only screen and (max-width: 1200px) {
  .main {
    width: 58%;
  }

  .desc {
    font-size: 15px;
    width: 100%;
    height: 100px;
    text-overflow: ellipsis;
  }
}
@media only screen and (max-width: 800px) {
  .main {
    width: 90%;
  }
}
</style>