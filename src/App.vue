
<template>
  <div class="loader" :class="loaded ? 'loaded' : ''">
    <div class="icon-loading">
      <IconLoading color="#fb7413"></IconLoading>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { defineComponent } from "vue";
import { useSurveyStore } from "./stores/survey";
import IconLoading from "./components/core/icons/iconLoading.vue";

export default defineComponent({
  data() {
    return {
      loaded: false as boolean,
    };
  },
  async mounted() {
    await this.loadSurveys();
    this.loaded = true;
  },
  methods: {
    ...mapActions(useSurveyStore, {
      loadSurveys: "getSurveysData",
    }),
  },
  components: { IconLoading },
});
</script>

<style lang="scss">
body {
  background-color: $bg-primary;
  .loader {
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: $bg-primary;
    z-index: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: clip-path 0.5s ease;
    clip-path: circle(100% at 50% 50%);

    &.loaded {
      clip-path: circle(0% at 50% 50%);
    }
    .icon-loading {
      color: white;
      font-size: 2em;
    }
  }
}
</style>
