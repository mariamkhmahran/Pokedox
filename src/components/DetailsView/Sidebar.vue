<template>
  <div class="sidebar">
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
    <div class="row abilities">
      <span id="abilitiesParam">
        <b>ABILITIES:</b>
      </span>
      <span :key="ability" v-for="ability in abilities" id="abilities">{{ability}}</span>
    </div>
  </div>
</template>

<script>
import Tag from "../Tag";
import Stats from "./Stats";
/* eslint-disable no-console */
export default {
  components: {
    Tag,
    Stats
  },
  props: ["ID"],
  data: () => {
    return {
      pokemon: null,
      pokeName: "",
      desc: "",
      spriteURL: "",
      types: [],
      abilities: [],
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
      var num = this.ID;
      while (num.length < 3) {
        num = "0" + num;
      }
      return "#" + num;
    }
  },
  watch: {
    ID() {
      this.loadPokemon();
    },
    pokemon() {
      this.spriteURL = this.pokemon.sprites.front_default;
      this.types = this.pokemon.types.map(t => t.type.name);
      this.abilities = this.pokemon.abilities.map(t => t.ability.name);
      this.pokeName = this.pokemon.name;
      this.height = this.pokemon.height / 10;
      this.weight = this.pokemon.weight / 10;
      this.baseExp = this.pokemon.base_experience;
      this.stats = this.pokemon.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      }));
    }
  },
  methods: {
    loadPokemon() {
      this.getPokemon(this.ID).then(res => {
        this.pokemon = res.pokemon;
        this.desc = res.desc;
      });
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 46%;
  height: 80vh;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 6px;
  position: fixed;
  top: 100px;
  right: 40px;
  padding: 20px;
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

.row #abilities {
  margin-left: 5px;
  font-size: 18px;
  color: rgb(141, 140, 140);
}

#abilities:not(:last-child):after {
  content: ", ";
}

#abilitiesParam {
  font-size: 18px;
  color: black;
  margin-top: 2px;
  margin-right: 3px;
}

.row.abilities {
  align-items: center;
  margin: 20px 35px 0;
}

@media only screen and (max-width: 1200px) {
  .sidebar {
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
  .sidebar {
    width: 90%;
  }
}
</style>