<template>
  <div id="container" :class="{side: this.side}" @click="showDetails" @mouseenter="preFetchPokemon">
    <div class="cardBody">
      <div id="Upper"></div>
      <div class="cardFooter">
        <span id="pokeNumber">{{pokeNumber}}</span>
        <br />
        <span id="name">
          <b>{{name}}</b>
        </span>
        <div id="tags">
          <Tag :key="type" v-for="type in types" :type="type" />
        </div>
      </div>
    </div>
    <img :id="`sprite_${name}`" :src="spriteURL" class="sprite loading" />
  </div>
</template>

<script>
import Tag from "../Tag";
/* eslint-disable no-console */

export default {
  components: {
    Tag
  },
  props: { name: String, side: Boolean },
  data: () => {
    return {
      pokemon: null,
      ID: "",
      spriteURL: "",
      types: []
    };
  },
  beforeMount() {
    this.getPokemon(this.name).then(({ pokemon, id, spriteURL, types }) => {
      this.pokemon = pokemon;
      this.ID = id;
      this.spriteURL = spriteURL;
      this.types = types;
    });
  },
  mounted() {
    var id = `#sprite_${this.name}`;
    var img = document.querySelector(id);

    img.onload = function() {
      var i = document.querySelector(id);
      i.classList.remove("loading");
      i.src = img.src;
      img.onload = undefined;
    };
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
  methods: {
    showDetails() {
      this.$router.replace({ path: `/pokemon/${this.name}` });
    },
    preFetchPokemon() {
      this.getPokemon(this.name, true);
    }
  }
};
</script>

<style scoped>
#container {
  width: 22%;
  margin: 10px auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.cardBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: relative;
  top: 0px;
  right: 0px;
}

.side#container {
  width: 45%;
}

#container:hover {
  transform: scale(1.03);
  box-shadow: 0 2px 12px 0 rgba(255, 90, 96, 0.37);
}

#container:hover .sprite {
  box-shadow: 0 2px 12px 0 rgba(255, 90, 96, 0.37);
}

.cardFooter {
  height: 73px;
  padding: 8%;
  margin-top: 21%;
}

#pokeNumber {
  color: rgb(141, 140, 140);
  margin: 10px 0px;
}

#name {
  color: black;
  font-size: 20px;
}

.sprite {
  align-self: center;
  width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 11%;
  transition: 0.3s;
}

.loading {
  content: url("../../assets/loadingImage.png");
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
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

#Upper {
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/background.png");
  transition: 0.3s;
  height: 150px;
  overflow: visible;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

#tags {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@media only screen and (max-width: 1200px) {
  #container {
    width: 32%;
  }

  .side#container {
    width: 97%;
  }
}
@media only screen and (max-width: 800px) {
  #container {
    width: 49%;
  }

  .side#container {
    width: 97%;
  }
}
@media only screen and (max-width: 500px) {
  #container {
    width: 99%;
  }

  .side#container {
    width: 97%;
  }
}
</style>