<template>
  <div class="detailesView">
    <Home side />
    <Sidebar :ID="ID" />
  </div>
</template>

<script>
import Home from "../Home";
import Sidebar from "./Sidebar";

export default {
  components: {
    Home,
    Sidebar
  },
  props: ["ID"]
};
</script>

<style scoped>
.detailesView {
  display: flex;
  flex-direction: row;
  overflow: scroll;
}
</style>