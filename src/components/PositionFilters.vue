<template>
    <div class="flex-col">
            <label v-for="(position, index) in positions" :key="index" class="position-filter checkbox flex items-start">
                <input type="checkbox"  v-model="position.enabled" @change="togglePosition(position)">
                {{ position.abbreviation }}
            </label>
    </div>
</template>

<script>
import positions from "../positions";

export default {
  data() {
    return {
      positions: positions
    };
  },
  methods: {
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
