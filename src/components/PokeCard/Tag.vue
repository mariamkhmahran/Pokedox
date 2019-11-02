<template>
  <img class="tag" :src="imgPath()" />
</template>

<script>
export default {
  props: ["type"],
  methods: {
    imgPath() {
      var images = require.context("../../assets/", false, /\.png$/);
      return images("./" + this.type + ".png");
    }
  }
};
</script>

<style scoped>
.tag {
  height: 26px;
  width: 26px;
  margin: 8px 5px 0px 0;
}
</style>