<template>
    <div class="flex-col">
            <label v-for="(position, index) in positions" :key="index" class="position-filter checkbox flex items-start">
                <input type="checkbox"  v-model="position.enabled" @change="togglePosition(position)">
                {{ position.name }}
            </label>
    </div>
</template>

<script>
const positions = [
  {
    name: "C",
    enabled: 1
  },
  {
    name: "CB",
    enabled: 1
  },
  {
    name: "DT",
    enabled: 1
  },
  {
    name: "FB",
    enabled: 1
  },
  {
    name: "FS",
    enabled: 1
  },
  {
    name: "HB",
    enabled: 1
  },
  {
    name: "K",
    enabled: 1
  },
  {
    name: "LE",
    enabled: 1
  },
  {
    name: "LG",
    enabled: 1
  },
  {
    name: "LOLB",
    enabled: 1
  },
  {
    name: "LT",
    enabled: 1
  },
  {
    name: "MLB",
    enabled: 1
  },
  {
    name: "P",
    enabled: 1
  },
  {
    name: "QB",
    enabled: 1
  },
  {
    name: "RE",
    enabled: 1
  },
  {
    name: "RG",
    enabled: 1
  },
  {
    name: "ROLB",
    enabled: 1
  },
  {
    name: "RT",
    enabled: 1
  },
  {
    name: "SS",
    enabled: 1
  },
  {
    name: "TE",
    enabled: 1
  },
  {
    name: "WR",
    enabled: 1
  }
];

export default {
  data() {
    return {
      positions: positions
    };
  },
  methods: {
    togglePosition(position) {
      this.$emit("toggle-position", position);
      console.log(position);
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
