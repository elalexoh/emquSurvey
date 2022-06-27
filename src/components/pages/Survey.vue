
<template>
  <div class="main-page page">
    <survey-stepper></survey-stepper>
    <router-link to="/dashboard" tag="a" class="link"
      >ir al dashboard</router-link
    >
  </div>
</template>

<script lang="ts">
import surveyStepper from "../../components/core/surveyStepper/surveyStepper.vue";
import { defineComponent } from "vue-demi";

export default defineComponent({
  components: { surveyStepper },
});
</script>

<style lang="scss">
</style>
