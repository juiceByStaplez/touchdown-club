<template>
    <div class="flex-col">
            <label v-for="(position, index) in fields" :key="index" class="position-filter checkbox flex items-start">
                <input type="checkbox"  :checked="position.enabled" @click.alt.stop="selectOnly(position)" @click.exact="togglePosition(position)">
                {{ position.abbreviation }}
            </label>
    </div>
</template>

<script>
export default {
  data() {
    return {
      fields: []
    };
  }
};
</script>