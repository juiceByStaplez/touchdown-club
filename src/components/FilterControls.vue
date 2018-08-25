<template>
<nav class="panel w-1/4 flex flex-col">
  <p class="panel-heading">
    filters
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input is-small" type="text" placeholder="search" v-model="query" @keydown="nameSearch" @keyup.delete="resetSearch">
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
    <button class="button is-link is-outlined is-fullwidth" @click="resetFilters">
      reset all filters
    </button>
  </div>
</nav>
</template>

<script>
import _ from "lodash";

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
      filterBlocks: filterBlocks,
      query: ""
    };
  },
  methods: {
    nameSearch: _.debounce(function() {
      if (this.query.length > 0) {
        this.$eventHub.emit("search-by-name", this.query);
      }
    }, 400),
    resetFilters() {
      this.query = "";
      this.$eventHub.emit("reset-search");
      this.$eventHub.emit("reset-position-filters");
    },
    resetSearch: _.debounce(function() {
      if (this.query.length === 0) {
        this.$eventHub.emit("reset-search");
      }
    }, 400)
  }
};
</script>