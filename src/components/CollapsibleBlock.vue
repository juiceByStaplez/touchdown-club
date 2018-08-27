<template>
    <a class="panel-block panel-block-collapsible flex-col" @click="isCollapsed = !isCollapsed">
      <header class="panel-header flex items-center">
           <span class="panel-icon">
            <i class="fas text-green-darker" :class="block.icon" aria-hidden="true" />
        </span>
        {{ block.title }}
      </header>
        <div class="panel-body" :class="collapseClass">
          <component :is="block.component" />
        </div>
    </a>
</template>

<script>
import PositionFilters from "./PositionFilters";
import FieldFilters from "./FieldFilters";

export default {
  components: {
    FieldFilters,
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
      isCollapsed: true,
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
.panel-body {
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  max-height: 26.1rem;

  &.is-collapsed {
    transition: max-height 0.2s ease-out;
    max-height: 0;
  }
}
</style>
