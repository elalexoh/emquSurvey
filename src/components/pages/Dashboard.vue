<template>
  <div class="page dashboard-page">
    <div class="dashboard-wrapper">
      <!-- RESUME -->
      <div class="card bg--accent">
        <div class="card__header"></div>
        <div class="card__content">
          <div class="resume-wrapper">
            <h1 class="main-title">Encuestas terminadas</h1>
            <p class="results">{{ total }}<span class="small">✔️</span></p>
          </div>
        </div>
        <div class="card__footer"></div>
      </div>
      <!-- DETAILS -->
      <div class="card dashboard-content">
        <!-- HEAD -->
        <div class="card__header"></div>
        <!-- BODY -->
        <div class="card__content">
          <!-- SOCIALMEDIA BY TIME -->
          <GraphCustom
            :dataSets="hours"
            :total="total"
            type="p"
            title="Tiempo promedio por red social"
          ></GraphCustom>

          <hr />

          <!-- SOCIALMEDIA BY AGE -->
          <GraphCustom
            :dataSets="ranges"
            :total="total"
            type="h"
            title="Uso por edad"
          ></GraphCustom>
        </div>
        <!-- FOOTER -->
        <div class="card__footer">
          <h2
            class="badge success ripple"
            :title="`Votes: ${mostPopular.votes}`"
          >
            <span class="">
              {{ mostPopular.socialMedia.label }}
            </span>
            👍
          </h2>
          <h2
            class="badge danger ripple"
            :title="`Votes: ${leastPopular.votes}`"
          >
            <span class="">
              {{ leastPopular.socialMedia.label }}
            </span>
            👎
          </h2>
        </div>
      </div>
    </div>
    <router-link to="/" tag="a" class="link ripple"
      >ir a la encuesta</router-link
    >
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent } from "vue-demi";
import { DataSet } from "../../models/dataSet.model";
import { useSurveyStore } from "../../stores/survey";
import GraphCustom from "../core/graph/graphCustom.vue";
export default defineComponent({
  components: {
    GraphCustom,
  },
  data() {
    return {
      // total: 100,
      dataSets: [
        {
          name: "Instagram",
          users: 10,
          ages: [
            {
              name: "range-a",
              count: 3,
            },
            {
              name: "range-b",
              count: 2,
            },
            {
              name: "range-c",
              count: 2,
            },
            {
              name: "range-d",
              count: 3,
            },
          ],
        },
        {
          name: "Youtube",
          users: 50,
          ages: [
            {
              name: "range-a",
              count: 25,
            },
            {
              name: "range-b",
              count: 25,
            },
            {
              name: "range-c",
              count: 40,
            },
            {
              name: "range-d",
              count: 10,
            },
          ],
        },
        {
          name: "Twitter",
          users: 10,
          ages: [
            {
              name: "range-a",
              count: 1,
            },
            {
              name: "range-b",
              count: 5,
            },
            {
              name: "range-c",
              count: 2,
            },
            {
              name: "range-d",
              count: 2,
            },
          ],
        },
        {
          name: "Tiktok",
          users: 10,
          ages: [
            {
              name: "range-a",
              count: 5,
            },
            {
              name: "range-b",
              count: 2,
            },
            {
              name: "range-c",
              count: 2,
            },
            {
              name: "range-d",
              count: 1,
            },
          ],
        },
        {
          name: "Facebook",
          users: 10,
          ages: [
            {
              name: "range-a",
              count: 1,
            },
            {
              name: "range-b",
              count: 3,
            },
            {
              name: "range-c",
              count: 5,
            },
            {
              name: "range-d",
              count: 1,
            },
          ],
        },
        {
          name: "WhatsApp",
          users: 10,
          ages: [
            {
              name: "range-a",
              count: 7,
            },
            {
              name: "range-b",
              count: 1,
            },
            {
              name: "range-c",
              count: 1,
            },
            {
              name: "range-d",
              count: 1,
            },
          ],
        },
      ] as DataSet[],
      // dataSetsAge: null as DataSet[] | null,
    };
  },
  computed: {
    ...mapState(useSurveyStore, {
      surveys: "getSurveys",
      total: "getTotal",
      surveysByFav: "getSurveysByFav",
      surveysByAge: "getSurveysByAge",
      socialMedias: "socialMedias",
      hours: "getHour",
      ranges: "getRanges",
      // getRanges: "getRanges",
    }),
    mostPopular() {
      let mostPopular = {
        socialMedia: {} as { _id: string; label: string },
        votes: -Infinity,
      };
      for (const key in this.surveysByFav as any[]) {
        // @ts-ignore: Unreachable code error
        let votes = this.surveysByFav[key].length;

        if (votes > mostPopular.votes) {
          mostPopular.votes = votes;
          // @ts-ignore: Unreachable code error
          mostPopular.socialMedia = this.socialMedias.find((sm) => {
            return sm._id === key;
          });
        }
      }
      return mostPopular;
    },
    leastPopular() {
      let leastPopular = {
        socialMedia: {} as { _id: string; label: string },
        votes: Infinity,
      };
      for (const key in this.surveysByFav) {
        // @ts-ignore: Unreachable code error
        let votes = this.surveysByFav[key].length;

        if (votes < leastPopular.votes) {
          leastPopular.votes = votes;
          // @ts-ignore: Unreachable code error
          leastPopular.socialMedia = this.socialMedias.find((sm) => {
            return sm._id === key;
          });
        }
      }
      return leastPopular;
    },
  },
  mounted() {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.dashboard-page {
  font-size: 15px;
  .dashboard-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: max-content;
  }
  .card {
    $card-p: 1.5em;

    // width: calc(28.13% - 80px);
    width: auto;
    // max-width: 350px;
    color: $white;
    padding: 1.5em 2em;
    border-radius: calc($card-p / 2);
    font-size: 15px;
    background: -webkit-radial-gradient(top, #232a34, #171e28);
    background: radial-gradient(at top, #232a34, #171e28);
    // transition: all 1s ease;
    .main-title {
      font-size: 0.85em;
      // margin-bottom: 1.5em;
      opacity: 0.75;
      font-weight: lighter;
      letter-spacing: 0.5px;
    }
    .results {
      font-size: 2em;
      font-weight: bold;
      .small {
        font-size: 0.5em;
      }
    }
    .card__header {
    }
    .card__content {
      .resume-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    .card__footer {
    }
    &.dashboard-content {
      width: max-content;
      .card__header {
      }
      .card__footer {
        justify-content: center;
        display: flex;
        gap: 2em;
        margin-top: 2em;
        .badge {
          padding: 15px 10px;
          border-radius: 7.5px;
          font-size: 0.85em;
          line-height: 0;
          font-weight: bold;
          cursor: pointer;
          &.success {
            background-color: $success;
          }
          &.danger {
            background-color: $danger;
          }
        }
      }
      .card__content {
        margin: 1em 0;
      }
    }
  }
}
</style>