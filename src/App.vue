<script lang="ts">
import surveyStepper from "./components/core/surveyStepper/surveyStepper.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

export default {
  components: { surveyStepper },
  data() {
    return {};
  },
};
</script>

<template>
  <div class="main-page">
    <survey-stepper></survey-stepper>
  </div>
</template>

<style lang="scss">
body {
  background-color: $bg-primary;
}
.main-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
