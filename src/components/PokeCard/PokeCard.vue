<template>
  <div class="pokeCard">
    <div class="cardBody">
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
  </div>
</template>

<script>
import axios from "axios";
import Tag from "./Tag";
/* eslint-disable no-console */

export default {
  components: {
    Tag
  },
  props: ["pokemon"],
  data: () => {
    return {
      number: "",
      spriteURL: "",
      types: []
    };
  },
  created() {
    var num = this.pokemon.url.split("/");
    this.number = num[num.length - 2];
    this.getPokeSprites();
    this.getTypes();
  },
  computed: {
    pokeNumber() {
      var num = this.number;
      while (num.length < 3) {
        num = "0" + num;
      }
      return "#" + num;
    },
    pokeName() {
      return this.pokemon.name;
    }
  },
  methods: {
    getPokeSprites() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-form/${this.number}/`)
        .then(r => {
          this.spriteURL = r.data.sprites.front_default;
        });
    },
    getTypes() {
      axios.get(this.pokemon.url).then(r => {
        this.types = r.data.types.map(t => t.type.name);
      });
    }
  }
};
</script>

<style scoped>
.pokeCard {
  width: 22%;
  margin: 10px auto;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.pokeCard:hover {
  transform: scale(1.03);
}

.cardBody {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 6px;
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
  .pokeCard {
    width: 32%;
  }
}
@media only screen and (max-width: 800px) {
  .pokeCard {
    width: 49%;
  }
}
@media only screen and (max-width: 500px) {
  .pokeCard {
    width: 99%;
  }
}
</style>