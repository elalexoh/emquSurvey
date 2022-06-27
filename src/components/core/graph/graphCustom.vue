<template>
  <div class="graph-wrapper">
    <!-- <h2 class="main-title">
      {{ title }}
    </h2> -->
    <!-- CHECK TYPE -->
    <template class="" v-if="type === 'p'">
      <div class="graph">
        <div
          class="graph__item"
          v-for="(socialMedia, i) in socialMedias"
          :key="`rm-${i}`"
          :title="`${socialMedia.label} - ${
            hours[`${socialMedia.label.toLowerCase()}Prom`]
          }h`"
        >
          <div class="prom-wrapper">
            <p class="prom">
              {{ hours[`${socialMedia.label.toLowerCase()}Prom`] }}h
            </p>
          </div>
          <div class="label">
            {{ socialMedia.label }}
          </div>
        </div>
      </div>
    </template>
    <template class="" v-else-if="type === 'h'">
      <!-- <pre>
        {{ dataSets }}
      </pre> -->
      <div class="graph--horizontal" :data-items="dataSets.length">
        <div
          class="graph__item"
          v-for="(sm, i) in socialMedias"
          :key="`sm-${i}`"
        >
          <!-- ${(data.users * 100) / total}% -->
          <div class="proyection" :title="``">
            <template v-for="(range, a) in ranges">
              <div
                class="result"
                v-if="
                  favs[sm._id] &&
                  Number(
                    getPercentByAmount(
                      dataSets[range._id][sm.label.toLowerCase()],
                      favs[sm._id].length
                    )
                  ) > 1.0
                "
                :key="`result-${a}`"
                :title="range.label"
                :style="{
                  width: `${getPercentByAmount(
                    dataSets[range._id][sm.label.toLowerCase()],
                    favs[sm._id].length
                  )}%`,

                  backgroundColor: colorSets[a],
                }"
              >
                <span class="percent"
                  >{{
                    getPercentByAmount(
                      dataSets[range._id][sm.label.toLowerCase()],
                      favs[sm._id].length
                    )
                  }}%</span
                >
              </div>
            </template>
          </div>
          <label class="label" for="">{{ sm.label }} </label>
        </div>
        <!-- <div class="legend-wrapper">
          <div
            class="legend"
            v-for="(age, i) in dataSets[0].ages"
            :key="`legend-${i}`"
          >
            <div
              class="colorBox"
              :style="{ backgroundColor: colorSets[i] }"
            ></div>
            <div class="label">
              {{ age.name }}
            </div>
          </div>
        </div> -->
      </div>
    </template>
    <div class="" v-else-if="type === 'v'">vertical</div>
    <div class="" v-else>Default</div>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { DataSet } from "../../../models/dataSet.model";
import { useSurveyStore } from "../../../stores/survey";

export default defineComponent({
  props: ["dataSets", "total", "type", "title"],
  data() {
    return {
      colorSets: ["#121417", "#121417", "#121417", "#121417"],
    };
  },
  computed: {
    ...mapState(useSurveyStore, {
      socialMedias: "socialMedias",
      hours: "getHour",
      ranges: "ageRanges",
      favs: "getSurveysByFav",
    }),
  },
  methods: {
    getPercentByAmount(count: number, total: number) {
      return ((count * 100) / total).toFixed(1);
    },
  },
});
</script>

<style lang="scss">
.graph-wrapper.graph-wrapper {
  // margin-bottom: 4em;
  .main-title {
    text-align: center;
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 1em;
  }
}
.graph {
  display: flex;
  justify-content: space-evenly;
  gap: 15px;

  &__item {
    // background-color: #bada55;
    cursor: pointer;
    flex: 0 1 55px;
    .label,
    .proyection {
      transition: all 0.5s ease;
    }
    .proyection {
      cursor: pointer;
      background-color: $dark-blue-l;
      height: 75px;
      position: relative;
      overflow: hidden;
      border-radius: 125px;
      width: 50%;
      max-width: 20px;
      min-width: 15px;
      margin: 0 auto;
      opacity: 1;
      .result {
        border-radius: calc(125px * 0.33);
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 0%; //TODO: DINAMICO
        background-color: $success;
        transition: height 1s ease, background-color 0.5s ease;
        &:hover {
          background-color: $accent !important;
        }
      }
    }
    .label {
      display: block;
      margin-top: 1em;
      opacity: 0.5;
      text-align: center;
    }
    .prom-wrapper {
      .prom {
        // background-color: #bada55;
        font-size: 1.5em;
        text-align: center;
        font-weight: bold;
        opacity: 0.75;
        transition: opacity 0.5s ease, transform 0.2s ease;
      }
    }
    &:hover {
      .label,
      .proyection {
        opacity: 1;
      }
      .proyection {
        transform: scale(1.1);
      }
      .prom-wrapper {
        .prom {
          opacity: 1;
          transform: scale(1.1);
        }
      }
    }
  }

  &--horizontal {
    @extend .graph;
    flex-direction: column;
    .graph__item {
      // flex-wrap: wrap; //TODO: DEBUG
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      flex: 0 1 auto;
      margin: 0 2em;
      gap: 2em;
      .label {
        flex: 0 1 35%;
        margin-top: 0;
      }
      .proyection {
        height: auto;
        margin: 0;
        width: 0;
        flex: 0 1 100%;
        max-width: none;
        border-radius: 0;
        height: 30px;

        background-color: $dark-blue-l;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        border-radius: 25px;
        overflow: hidden;
        // width: 200px;
        gap: 5px;
        .result {
          border-radius: 5px;
          height: 75%;
          position: static;
          background-color: $success;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: $white;
          .span {
            display: block;
          }
          &:nth-child(1) {
            // background: #bada55 !important;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
          }
          &:last-child {
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            // background-color: #bada55 !important;
          }
          // margin: 0 1rem;
        }
      }
      .proyections {
      }
    }
    .legend-wrapper {
      margin-top: 1em;
      display: flex;
      justify-content: space-evenly;
      .legend {
        display: flex;
        // flex-direction: column;
        align-items: center;
        gap: 0.5em;
        .colorBox {
          height: 1em;
          border-radius: 5px;
          width: 1em;
        }
        .label {
          line-height: 0;
          font-size: 0.85em;
          opacity: 0.85;
          font-weight: lighter;
        }
      }
    }
    // background-color: #bada55;
  }
}
</style>