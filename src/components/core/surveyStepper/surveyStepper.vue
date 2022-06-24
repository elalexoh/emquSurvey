<template>
  <section class="stepper">
    <div class="stepper__head">
      <div class="icons btn--icon">
        <icon-star color="#fb7413" />
      </div>
      <h1 class="main-title">How did we do?</h1>
    </div>
    <div class="stepper__content">
      <p class="statement">
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </p>
      <form action="">
        <div class="group">
          <input
            class="input"
            type="text"
            id="input-1"
            placeholder="¿Cual es tu correo?"
          />
        </div>
        <div class="group">
          <select name="oldAge" class="input--select" id="">
            <option value="" selected disabled>Indicanos tu edad</option>
            <option value="">18 - 25</option>
            <option value="">26 - 33</option>
            <option value="">34 - 40</option>
            <option value="">40+</option>
          </select>
        </div>
        <div class="group">
          <select name="gender" class="input--select" id="">
            <option value="" selected disabled>Indicanos tu genero</option>
            <option value="">Masculino</option>
            <option value="">Femenino</option>
            <option value="">No Binario</option>
          </select>
        </div>
        <div class="group">
          <input
            class="input"
            type="text"
            id="input-1"
            placeholder="¿Cual es tu red social favorita?"
          />
        </div>
        <div class="group">
          <p>{{ facebookTime }}</p>
          <input
            type="range"
            name="fb-time"
            v-model="facebookTime"
            min="0"
            max="24"
            step="1"
            id=""
          />
        </div>
        <div class="group">
          <p>{{ whatsTime }}</p>
          <input
            type="range"
            name="ws-time"
            min="0"
            max="24"
            step="1"
            id=""
            v-model="whatsTime"
          />
        </div>
        <div class="group">
          <p>{{ twitterTime }}</p>
          <input
            type="range"
            name="tw-time"
            min="0"
            max="24"
            step="1"
            id=""
            v-model="twitterTime"
          />
        </div>
        <div class="group">
          <p>{{ instagramTime }}</p>
          <input
            type="range"
            name="in-time"
            min="0"
            max="24"
            step="1"
            id=""
            v-model="instagramTime"
          />
        </div>
        <div class="group">
          <p>{{ tiktokTime }}</p>
          <input
            type="range"
            name="tk-time"
            min="0"
            max="24"
            step="1"
            id=""
            v-model="tiktokTime"
          />
        </div>
      </form>
    </div>
    <div class="stepper__footer">
      <button
        class="btn"
        :disabled="inProcess"
        type="submit"
        @click="saveSurvey(1)"
      >
        <template v-if="inProcess"> Espere un momento </template>
        <template v-else> Continuar </template>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import iconStartImg from "../../../assets/images/icon_star.svg";
import iconStar from "../icons/iconStar.vue";

export default {
  components: { iconStar },
  props: ["color"],
  data() {
    return {
      iconStartImg,
      inProcess: false,
      facebookTime: 0,
      whatsTime: 0,
      twitterTime: 0,
      instagramTime: 0,
      tiktokTime: 0,
    };
  },
  methods: {
    saveSurvey(step: number): void {
      if (!this.inProcess) {
        this.inProcess = true;
        setTimeout(() => {
          this.inProcess = false;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss">
.stepper {
  $stepper-p: 40px;

  width: calc(28.13% - 80px);
  max-width: 350px;
  color: $white;
  padding: $stepper-p;
  border-radius: calc($stepper-p / 2);
  font-size: 15px;
  background: -webkit-radial-gradient(top, #232a34, #171e28);
  background: radial-gradient(at top, #232a34, #171e28);

  &__head {
    .icons {
      margin-bottom: 40px;
      display: flex;
      gap: 10px;
    }
    .main-title {
      font-weight: bold;
      font-size: 1.5em;
      letter-spacing: 0.5px;
      margin-bottom: 15px;
    }
  }
  &__content {
    .statement {
      font-size: 0.9em;
      color: $light-grey;
      font-weight: 300;
      margin-bottom: 20px;
      line-height: 1.5;
    }
  }
  &__footer {
    margin-top: 25px;
  }
  .group {
    .label {
      // background-color: #bada55;
      display: none;
    }
    .input {
      $padding-x: 20px;
      background-color: $bg-primary;
      border: 0;
      width: calc(100% - (#{$padding-x} * 2));
      height: 30px;
      border-radius: 20px;
      padding: 5px $padding-x;
      color: white;
      font-size: 1em;
      letter-spacing: 0.5px;
      transition: background-color 0.3s ease;

      &--select {
        @extend .input;
        width: 100%;
        height: 35px;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        appearance: none;
        &::placeholder {
          background-color: #bada55;
        }
        option[selected] {
          color: red;
        }
      }

      &:focus {
        background-color: $dark-blue;
        outline: 0;
      }
    }
  }

  .btn {
    cursor: pointer;
    border: 0;
    width: 100%;
    background-color: $white;
    color: $orange;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 10px;
    letter-spacing: 2px;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s 0.1s ease,
      letter-spacing 0.3s ease;
    &:hover {
      color: $white;
      background-color: $accent;
      letter-spacing: 1px;
    }
    &--icon {
      @extend .btn;
      background-color: $dark-blue;
      padding: 10px 12px;
      width: max-content;
      height: max-content;
      border: 0;
      &:focus {
        outline: 0;
      }
      img {
        width: 15px;
      }
      &:hover {
        color: transparent;
        background-color: transparent;
        // letter-spacing: 1px;
      }
    }
  }
}
img {
  width: 100%;
  height: auto;
}
</style>