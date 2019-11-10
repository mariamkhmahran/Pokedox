<template>
  <div class="row">
    <img class="tag" :class="{big:details}" :src="imgPath()" />
    <span v-if="details" class="tagName">{{type}}</span>
  </div>
</template>

<script>
export default {
  props: { type: String, details: Boolean },
  methods: {
    imgPath() {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + this.type + ".png");
    }
  }
};
</script>

<style scoped>
.tag {
  height: 26px;
  width: 26px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 5px 0px 0;
}

.tagName {
  font-size: 20px;
  margin: 0px 10px;
}

.tag.big {
  height: 32px;
  width: 32px;
}
</style>