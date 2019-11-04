<template>
  <div class="container">
    <div id="param">
      <span id="paramValue">{{paramFormatted}}</span>
    </div>
    <div :key="i" v-for="i in numberOfDots" class="stat" />
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  props: ["param", "value"],
  computed: {
    numberOfDots() {
      return Math.floor(this.value / 10);
    },
    paramFormatted() {
      var v = this.param.split("-").join(" ");
      console.log(v);

      return v;
    }
  }
};
</script>

<style scoped>
.stat {
  background-color: #ffc81d;
  /* border-style: solid;
  border-color: #3860a9;
  border-width: 2px; */
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin: 0 auto;
}
.stat:after {
  content: ".";
  visibility: hidden;
}

.container {
  display: flex;
  align-content: center;
  flex-direction: column-reverse;
  /* margin: 0 20px; */
  width: 40px;
}

#paramValue {
  display: inline-block;
  align-self: center;
  font-size: 12px;
  color: rgb(141, 140, 140);
  transform: rotate(-90deg);
  display: flex;
}

#param {
  margin-top: 12px;
  align-self: center;
  height: 45px;
}
</style>