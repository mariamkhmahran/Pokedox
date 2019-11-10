<template>
  <div class="container">
    <div class="stat">
      <span id="paramValue">{{param}} {{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["param", "value"]
};
</script>

<style scoped>
.stat {
  background-color: #087e8b;
  border-radius: 50vh;
  width: 80%;
  height: 50px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.281);
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 32%;
}

#paramValue {
  font-size: 17px;
  color: white;
}
</style>