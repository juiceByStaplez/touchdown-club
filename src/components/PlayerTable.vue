<template>
           
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" :class="{'is-loading': isLoading}">
		<thead>
			<tr>
				<th>Name</th>
        <th>Position</th>
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
                    :title="field.readable"
                    :class="selectionClass(field.name)"
                    @click.alt.exact="setSort(SECONDARY_SORT, field)"
                    @click.ctrl.exact="setSort(TERTIARY_SORT, field)"
                    @click.exact="setSort(PRIMARY_SORT, field)">{{ field.abbreviation | fieldHeader}}</th>
			</tr>
		</thead>
		<tbody class="overflow-y-scroll" style="height: 50vh;">
			<tr :key="player.primaryKey" v-for="player in filteredPlayers">
				<td class="whitespace-no-wrap">{{ player.firstName }} {{ player.lastName }}</td>
        <td>{{ player.position }} </td>
				<td>{{ player.overall }}</td>
				<td v-for="(field, index) in rating_fields" :key="index" v-show="field.enabled"> {{ player[field.name] }} </td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import fields from "../fields";
import positions from "../positions";
import _ from "lodash";
import fuzzysort from "fuzzysort";
const api_uri =
  window.location.host.indexOf("localhost") > -1
    ? "http://localhost:3000"
    : "https://api.touchdownclub.net:3000";
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
      nameQuery: "",
      players: [],
      positions: _.cloneDeep(positions),
      rating_fields: fields,
      sortBy: ["overall", "speed"],
      sortDir: ["desc", "desc"],
      sortDirectionLabels: ["desc", "asc"],
      PRIMARY_SORT: 0,
      SECONDARY_SORT: 1,
      TERTIARY_SORT: 2,
      isLoading: true
    };
  },
  computed: {
    filteredPlayers: function() {
      let players = this.players;
      if (this.nameQuery.length > 0) {
        players = fuzzysort
          .go(this.nameQuery, players, {
            keys: ["firstName", "lastName"]
          })
          .map(r => r.obj);
      }
      return players;
    }
  },
  created() {
    this.getPlayers();
  },
  mounted() {
    this.$eventHub.on("toggle-position", position => {
      this.togglePosition(position);
    });

    this.$eventHub.on("select-only-position", position => {
      this.selectOnly(position);
    });

    this.$eventHub.on("search-by-name", query => {
      this.nameSearch(query);
    });

    this.$eventHub.on("reset-search", () => {
      this.resetSearch();
    });

    this.$eventHub.on("reset-position-filters", () => {
      this.positions = _.cloneDeep(positions);
      this.getPlayers();
    });
  },
  methods: {
    async getPlayers() {
      let url = new URL(api_uri + "/players");
      const params = {
        positions: this.positions
          .filter(p => p.enabled)
          .map(p => p.abbreviation),
        sortBy: this.sortBy.map(s =>
          s
            .replace("_rating", "")
            .replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")
            .toLowerCase()
        ),
        sortDir: this.sortDir
      };
      url.search = new URLSearchParams(params);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
      this.players = await response.json();
      this.players = this.players.map(p => {
        return {
          firstName: p.first_name,
          lastName: p.last_name,
          position: p.position,
          overall: p.overall,
          speed_rating: p.speed,
          acceleration_rating: p.acceleration,
          trucking_rating: p.trucking,
          catching_rating: p.catching,
          breakTackle_rating: p.break_tackle,
          jumping_rating: p.jumping,
          bCVision_rating: p.bc_vision,
          stiffArm_rating: p.stiff_arm,
          carrying_rating: p.carrying,
          agility_rating: p.agility,
          elusiveness_rating: p.juke_move,
          jukeMove_rating: p.elusiveness,
          spinMove_rating: p.spin_move,
          awareness_rating: p.awareness,
          throwPower_rating: p.throw_power,
          kickReturn_rating: p.kick_return,
          leadBlock_rating: p.lead_block,
          strength_rating: p.strength,
          playAction_rating: p.play_action,
          pursuit_rating: p.pursuit,
          catchInTraffic_rating: p.catch_in_traffic,
          spectacularCatch_rating: p.spectacular_catch,
          shortRouteRunning_rating: p.short_route_running,
          mediumRouteRunning_rating: p.medium_route_running,
          deepRouteRunning_rating: p.deep_route_running,
          finesseMoves_rating: p.finesse_moves,
          powerMoves_rating: p.power_moves,
          runBlock_rating: p.run_block,
          tackle_rating: p.tackle,
          injury_rating: p.injury,
          throwAccuracyShort_rating: p.short_throw_accuracy,
          throwAccuracyMid_rating: p.mid_throw_accuracy,
          throwAccuracyDeep_rating: p.deep_throw_accuracy,
          throwUnderPressure_rating: p.throw_under_pressure,
          playRecognition_rating: p.play_recognition,
          breakSack_rating: p.break_sack,
          runBlockPower_rating: p.run_block_powr,
          toughness_rating: p.toughness,
          throwOnTheRun_rating: p.throw_on_the_run,
          manCoverage_rating: p.man_coverage,
          zoneCoverage_rating: p.zone_coverage,
          release_rating: p.release,
          hitPower_rating: p.hit_power,
          kickAccuracy_rating: p.kick_accuracy,
          passBlockPower_rating: p.pass_block_pwr,
          impactBlocking_rating: p.impact_blocking,
          stamina_rating: p.stamina,
          kickPower_rating: p.kick_power,
          passBlock_rating: p.pass_block,
          press_rating: p.press,
          blockShedding_rating: p.block_sheddig,
          runBlockFinesse_rating: p.run_block_finesse,
          passBlockFinesse_rating: p.pass_block_finesse
        };
      });
    },
    nameSearch(query) {
      this.nameQuery = query;
    },
    resetSearch() {
      this.nameQuery = "";
    },
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
    selectOnly(pos) {
      this.positions = this.positions.map(p =>
        Object.assign(p, {
          enabled: p.abbreviation === pos.abbreviation
        })
      );
      this.getPlayers();
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
      this.getPlayers();
    },
    togglePosition(pos) {
      const position = this.positions.find(
        p => p.abbreviation === pos.abbreviation
      );
      position.enabled = !position.enabled;

      this.getPlayers();
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
