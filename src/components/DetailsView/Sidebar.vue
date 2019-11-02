<template>
  <div class="sidebar">
    <div class="row">
      <img id="sprite" :src="spriteURL" />
      <div class="col" style="width: 48%">
        <span id="pokeNumber">{{pokeNumber}}</span>
        <span id="pokeName">
          <b>{{pokeName}}</b>
        </span>
        <span class="data desc">{{desc}}</span>
      </div>
    </div>
    <div class="col">
      <span class="data">
        <b>Height:</b>
        {{height}} m
      </span>
      <span class="data">
        <b>Weight:</b>
        {{weight}} kg
      </span>
      <span class="data">
        <b>Base Experience:</b>
        {{baseExp}}
      </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  props: ["ID"],
  data: () => {
    return {
      pokemon: null,
      pokeName: "",
      desc: "",
      spriteURL: "",
      types: [],
      height: 0,
      weight: 0,
      baseExp: 0
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
      this.pokeName = this.pokemon.name;
      this.height = this.pokemon.height / 10;
      this.weight = this.pokemon.weight / 10;
      this.baseExp = this.pokemon.base_experience;
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
  cursor: pointer;
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
  border-color: rgba(150, 148, 148, 0.651);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.data {
  color: rgb(141, 140, 140);
  margin: 0 0 10px 15px;
  font-size: 25px;
}

.desc {
  font-size: 22px;
}

#pokeNumber {
  color: rgb(141, 140, 140);
  margin: 20px 0px 7px 15px;
  font-size: 25px;
}

#pokeName {
  color: black;
  font-size: 40px;
  margin: 0px 0px 17px 15px;
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
</style>