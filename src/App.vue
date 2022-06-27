
<template>
  <div class="loader" :class="loaded ? 'loaded' : ''">
    <div class="icon-loading">
      <IconLoading color="#fb7413"></IconLoading>
    </div>
  </div>
  <div class="development-by">
    <p>
      Desarrollado por
      <a href="https://deeply-portfolio.netlify.app/" target="_blank"
        ><span class="portfolio"
          >&lt;&gt;Frederick A. Gonzalez&lt;/&gt;</span
        ></a
      >
    </p>
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
  .development-by {
    position: absolute;
    background-color: $accent;
    line-height: 0;
    padding: 10px;
    color: white;
    left: 0;
    transform: rotate(180deg);
    writing-mode: vertical-lr;
    bottom: 50%;
    transform: rotate(180deg) translateY(-50%);
    a {
      text-decoration: none;
    }
    .portfolio {
      font-weight: bold;
      color: $bg-primary;
      // opacity: 0.;
      // color: ;
    }
  }
}
</style>
