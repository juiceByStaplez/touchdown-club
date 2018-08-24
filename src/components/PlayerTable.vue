<template>
           
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" :class="{'is-loading': isLoading}">
		<thead>
			<tr>
				<th>Name</th>
				<th 
                class="is-clickable"
                :class="selectionClass('overall')"
                @click.alt.exact="setSort(SECONDARY_SORT, {name:'overall'})"
                @click.ctrl.exact="setSort(TERTIARY_SORT, {name:'overall'})"
                @click.exact="setSort(PRIMARY_SORT, {name:'overall'})">
                    Ovr
                </th>
				<th 
                    v-for="(field, index) in rating_fields"
                    :key="index" 
                    v-show="field.enabled" 
                    class="whitespace-no-wrap is-clickable"
                    :class="selectionClass(field.name)"
                    @click.alt.exact="setSort(SECONDARY_SORT, field)"
                    @click.ctrl.exact="setSort(TERTIARY_SORT, field)"
                    @click.exact="setSort(PRIMARY_SORT, field)">{{ field.abbreviation | fieldHeader}}</th>
			</tr>
		</thead>
		<tbody class="overflow-y-scroll" style="height: 50vh;">
			<tr :key="player.primaryKey" v-for="player in filteredPlayers">
				<td class="whitespace-no-wrap">{{ player.firstName }} {{ player.lastName }}</td>
				<td>{{ player.overall }}</td>
				<td v-for="(field, index) in rating_fields" :key="index" v-show="field.enabled"> {{ player[field.name] }} </td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import fields from "../fields";
import _ from "lodash";

// eslint-disable-no-unused-vars

// const byField = field => (x, y) => x[field] - y[field];
const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);
const selectionClasses = [
  "is-primary-selected",
  "is-secondary-selected",
  "is-tertiary-selected"
];

export default {
  filters: {
    fieldHeader: value =>
      capitalize(
        value
          .replace("_rating", "")
          .replace(/([A-Z]+)/g, " $1")
          .replace(/([A-Z][a-z])/g, " $1")
      )
  },
  data() {
    return {
      players: [],
      positions: {},
      rating_fields: fields,
      sortBy: ["overall"],
      sortDir: ["desc"],
      sortDirectionLabels: ["desc", "asc"],
      PRIMARY_SORT: 0,
      SECONDARY_SORT: 1,
      TERTIARY_SORT: 2,
      isLoading: true
    };
  },
  computed: {
    filteredPlayers: function() {
      return this.sort(this.players);
    }
  },
  async created() {
    const response = await fetch("/data/players.json", {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    this.players = await response.json();

    // this.positions = this.players.reduce((map, obj) => {
    //   const currentPosition = map[obj.position];
    //   if (typeof currentPosition === "undefined") {
    //     return {
    //       ...map,
    //       [obj.position]: [obj]
    //     };
    //   }
    //   return {
    //     ...map,
    //     [obj.position]: [...currentPosition, obj]
    //   };
    // }, {});
  },
  methods: {
    sort(players) {
      this.isLoading = true;
      const sorted = _.orderBy(players, this.sortBy, this.sortDir);
      this.isLoading = false;
      return sorted;
    },
    selectionClass(fieldName) {
      const index = this.sortBy.indexOf(fieldName);
      const obj = {};
      if (index > -1) {
        obj[selectionClasses[index]] = true;
      }
      return obj;
    },
    setSort(targetIndex, field) {
      const index = this.sortBy.indexOf(field.name);
      if (index > -1) {
        this.sortBy.splice(index, 1);
        this.sortDir.splice(index, 1);
      }
      if (index === targetIndex) field.sort = 1 - field.sort;

      this.sortBy.splice(targetIndex, 0, field.name);
      this.sortDir.splice(targetIndex, 0, this.sortDirectionLabels[field.sort]);
      this.trimSorting();
    },
    trimSorting() {
      this.sortBy = this.sortBy.slice(0, 3);
      this.sortDir = this.sortDir.slice(0, 3);
    }
  }
};
</script>

<style lang="scss">
.is-clickable {
  &:hover {
    cursor: pointer;
  }
}

.is-primary-selected {
  background: paleturquoise;
}

.is-secondary-selected {
  background: palevioletred;
}

.is-tertiary-selected {
  background: palegreen;
}
</style>
