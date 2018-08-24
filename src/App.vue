<template>
  <div id="app" class="flex justify-between p-1">
    <FilterControls />
    <PlayerTable />
  </div>
</template>

<script>
import FilterControls from "./components/FilterControls";
import PlayerTable from "./components/PlayerTable";

export default {
  name: "app",
  components: {
    FilterControls,
    PlayerTable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
