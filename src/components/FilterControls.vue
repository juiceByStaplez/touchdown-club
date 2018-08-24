<template>
<nav class="panel w-1/4 flex flex-col">
  <p class="panel-heading">
    filters
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input is-small" type="text" placeholder="search">
      <span class="icon is-small is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  <!-- <p class="panel-tabs">
    <a class="is-active">all</a>
    <a>public</a>
    <a>private</a>
    <a>sources</a>
    <a>forks</a>
  </p> -->

  <CollapsibleBlock 
    v-for="block in filterBlocks" 
    :key="block.id"
    :block="block" />

  <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">
      reset all filters
    </button>
  </div>
</nav>
</template>

<script>
const filterBlocks = [
  {
    id: "positions",
    status: 1,
    title: "Positions",
    collapsed: false,
    collapsible: true,
    component: "PositionFilters",
    icon: "fa-user-secret"
  }
];
import CollapsibleBlock from "./CollapsibleBlock";

export default {
  components: {
    CollapsibleBlock
  },
  data() {
    return {
      filterBlocks: filterBlocks
    };
  }
};
</script>