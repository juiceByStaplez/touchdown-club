<template>
    <a class="panel-block panel-block-collapsible flex-col" :class="collapseClass" >
      <header class="panel-header flex">
           <span class="panel-icon">
            <i class="fas text-teal-dark" :class="block.icon" aria-hidden="true" />
        </span>
        {{ block.title }}
      </header>
        <div class="panel-body">
          <component :is="block.component" />
        </div>
    </a>
</template>

<script>
import PositionFilters from "./PositionFilters";

export default {
  components: {
    PositionFilters
  },
  props: {
    block: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isCollapsed: false,
      collapsible: true
    };
  },
  computed: {
    collapseClass() {
      return this.isCollapsed ? "is-collapsed" : "";
    }
  },
  methods: {
    collapse() {
      if (this.collapsible) {
        this.isCollapsed = !this.isCollapsed;
        this.module.collapsed = this.isCollapsed;
      }
    }
  }
};
</script>

<style lang="scss">
.panel-block-collapsible {
  overflow: hidden;
  transition: max-height 0.2s ease-out;

  &.is-collapsed {
    transition: max-height 0.2s ease-out;
    max-height: 60px;
  }
}
</style>
