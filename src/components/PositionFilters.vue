<template>
    <div class="flex-col">
            <label v-for="(position, index) in positions" :key="index" class="position-filter checkbox flex items-start">
                <input type="checkbox"  :checked="position.enabled" @click.alt.stop="selectOnly(position)" @click.exact="togglePosition(position)">
                {{ position.abbreviation }}
            </label>
    </div>
</template>

<script>
import positions from "../positions";

export default {
  data() {
    return {
      positions: _.cloneDeep(positions)
    };
  },
  mounted() {
    this.$eventHub.on("reset-position-filters", () => {
      this.positions = _.cloneDeep(positions);
    });
  },
  methods: {
    selectOnly(position) {
      this.positions = this.positions.map(p =>
        Object.assign(p, {
          enabled: p.abbreviation === position.abbreviation
        })
      );

      this.$eventHub.emit("select-only-position", position);
    },
    togglePosition(position) {
      position.enabled = !position.enabled;
      this.$eventHub.emit("toggle-position", position);
    }
  }
};
</script>

<style lang="scss">
.position-filter {
  width: 100%;
  display: flex;
}
</style>
