<template>
  <div class="cardBody" @click="showDetails" :class="{side: this.side}">
    <div id="Upper">
      <img id="sprite" :src="spriteURL" />
    </div>
    <div class="cardFooter">
      <span id="pokeNumber">{{pokeNumber}}</span>
      <br />
      <span id="pokeName">
        <b>{{pokeName}}</b>
      </span>
      <div id="tags">
        <Tag :key="type" v-for="type in types" :type="type" />
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";

export default {
  components: {
    Tag
  },
  props: { ID: String, side: Boolean },
  data: () => {
    return {
      pokemon: null,
      pokeName: "",
      spriteURL: "",
      types: []
    };
  },
  beforeMount() {
    this.getPokemon(this.ID).then(p => {
      this.pokemon = p.pokemon;
      this.spriteURL = this.pokemon.sprites.front_default;
      this.types = this.pokemon.types.map(t => t.type.name);
      this.pokeName = this.pokemon.name;
    });
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
  methods: {
    showDetails() {
      this.$router.replace({ path: `/pokemon/${this.ID}` });
    }
  }
};
</script>

<style scoped>
.cardBody {
  width: 22%;
  margin: 10px auto;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 6px;
}

.side {
  width: 45%;
}

.cardBody:hover {
  transform: scale(1.03);
}

.cardFooter {
  height: 73px;
  padding: 8%;
}

#pokeNumber {
  color: rgb(141, 140, 140);
  margin: 10px 0px;
}

#pokeName {
  color: black;
  font-size: 20px;
}

#sprite {
  align-self: center;
  width: 80%;
}

#Upper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

#tags {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@media only screen and (max-width: 1050px) {
  .cardBody {
    width: 32%;
  }
  .side {
    width: 90%;
  }
}
@media only screen and (max-width: 800px) {
  .cardBody {
    width: 49%;
  }
  .side {
    width: 90%;
  }
}
@media only screen and (max-width: 500px) {
  .cardBody {
    width: 99%;
  }
  .side {
    width: 90%;
  }
}
</style>