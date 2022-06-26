
<template>
  <div class="main-page page">
    <survey-stepper></survey-stepper>
    <!-- <button @click="increment(2)">+++</button>
    <h1 :style="{ color: 'white' }">HOLA?{{ customName }}</h1> -->
  </div>
</template>

<script lang="ts">
import surveyStepper from "../../components/core/surveyStepper/surveyStepper.vue";
// import { useSurveyStore } from "../../stores/survey";

// import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue-demi";

export default defineComponent({
  components: { surveyStepper },
  // methods: {
  //   ...mapActions(useSurveyStore, ["increment"]),
  //   ...mapActions(useSurveyStore, { myOwnName: "increment" }),
  // },
  // computed: {
  //   ...mapState(useSurveyStore, {
  //     customName: "step",
  //   }),
  // },
});
</script>

<style lang="scss">
</style>
