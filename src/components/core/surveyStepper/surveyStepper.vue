<template>
  <section class="stepper" :class="isCompleted ? 'completed' : ''">
    <!-- Stepper form -->
    <template v-if="!isCompleted">
      <div class="stepper__head">
        <div class="icons">
          <icon-star
            class="btn--icon"
            :class="currentStep === i + 1 ? 'active' : ''"
            v-for="(icon, i) in maxStep"
            :color="currentStep === i + 1 ? '#fb7413' : '#fb741330'"
            :key="`ic-${i + 1}`"
            @click="goToStep(i + 1)"
          />
        </div>
        <h1 class="main-title">¿Tienes unos minutos?</h1>
      </div>
      <div class="stepper__content">
        <p class="statement">
          Nos gustaria saber un poco sobre tu interacción con las redes
          sociales, cuentanos:
        </p>
        <form action="" class="stepper-form">
          <!-- ?? Step 1 ?? -->
          <transition name="bounce">
            <div class="step-1" v-if="currentStep === 1" key="step-1">
              <div class="group">
                <input
                  class="input"
                  type="text"
                  id="input-1"
                  placeholder="¿Cuál es tu correo?"
                  v-model="email"
                  @blur="emailTouched = true"
                />
                <span
                  class="validation-error"
                  v-if="emailTouched && emailError"
                >
                  Formato de email incorrecto.
                </span>
              </div>
              <div class="group">
                <select
                  name="oldAge"
                  class="input--select"
                  v-model="oldAge"
                  id=""
                  @change="oldAgeTouched = true"
                >
                  <option :value="undefined">Indicanos tu edad</option>
                  <option
                    :value="range._id"
                    v-for="(range, i) in ageRanges"
                    :key="i"
                  >
                    {{ range.label }}
                  </option>
                </select>
                <span
                  class="validation-error"
                  v-if="oldAgeTouched && oldAgeError"
                >
                  Este campo es requerido.
                </span>
              </div>
            </div>
          </transition>

          <!-- ?? Step 2 ?? -->
          <transition name="bounce">
            <div class="step-2" v-if="currentStep === 2" key="step-2">
              <div class="group">
                <select
                  name="gender"
                  class="input--select"
                  v-model="gender"
                  id=""
                  @change="genderTouched = true"
                >
                  <option :value="undefined">Indicanos tu género</option>
                  <option value="gender-a">Masculino</option>
                  <option value="gender-b">Femenino</option>
                  <option value="gender-c">No Binario</option>
                </select>
                <span
                  class="validation-error"
                  v-if="genderTouched && genderError"
                >
                  Este campo es requerido.
                </span>
              </div>
              <div class="group">
                <!-- <input
                  class="input"
                  type="text"
                  id="input-1"
                  placeholder="¿Cuál es tu red social favorita?"
                  v-model="favoriteSocialMedia"
                  @change="favoriteSocialMediaTouched = true"
                /> -->
                <select
                  name="oldAge"
                  class="input--select"
                  v-model="favoriteSocialMedia"
                  id=""
                  @change="favoriteSocialMediaTouched = true"
                >
                  <option :value="undefined">
                    ¿Cuál es tu red social favorita?
                  </option>
                  <option
                    :value="socialMedia._id"
                    v-for="(socialMedia, i) in socialMedias"
                    :key="i"
                  >
                    {{ socialMedia.label }}
                  </option>
                </select>
                <span
                  class="validation-error"
                  v-if="favoriteSocialMediaTouched && favoriteSocialMediaError"
                >
                  Este campo es requerido.
                </span>
              </div>
            </div>
          </transition>

          <!-- ?? Step 3 ?? -->
          <transition name="bounce">
            <div class="step-3" v-if="currentStep === 3" key="step-3">
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">Facebook</label>
                  <span class="label__time">{{ facebookTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="fb-time"
                  v-model="facebookTime"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                />
              </div>
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">WhatsApp</label>
                  <span class="label__time">{{ whatsTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="ws-time"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                  v-model="whatsTime"
                />
              </div>
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">Twitter</label>
                  <span class="label__time">{{ twitterTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="tw-time"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                  v-model="twitterTime"
                />
              </div>
            </div>
          </transition>

          <!-- ?? Step 4 ?? -->
          <transition name="bounce">
            <div class="step-4" v-if="currentStep === 4" key="step-4">
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">Instagram</label>
                  <span class="label__time">{{ instagramTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="in-time"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                  v-model="instagramTime"
                />
              </div>
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">TikTok</label>
                  <span class="label__time">{{ tiktokTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="tk-time"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                  v-model="tiktokTime"
                />
              </div>
              <!-- EXTRA YOUTUBE -->
              <div class="group">
                <div class="label">
                  <label class="label__title" for="">Youtube</label>
                  <span class="label__time">{{ youtubeTime }}h</span>
                </div>
                <input
                  type="range"
                  class=""
                  name="tk-time"
                  min="0"
                  max="24"
                  step="1"
                  id=""
                  v-model="youtubeTime"
                />
              </div>
            </div>
          </transition>
        </form>
      </div>

      <!-- ?? FOOTER ?? -->
      <div class="stepper__footer">
        <button
          class="btn ripple"
          :disabled="inProcess || !isSurveyCompleted()"
          type="submit"
          @click="saveSurvey()"
        >
          <template v-if="!isSurveyCompleted()">
            Complete la información
          </template>
          <template v-else-if="inProcess"> Espere un momento </template>
          <template v-else-if="currentStep === maxStep"> Enviar </template>
          <template v-else> Continuar </template>
        </button>
      </div>
    </template>
    <!-- Completed -->
    <template v-else>
      <div class="stepper__header">
        <img class="icon-thank" :src="iconThankYou" alt="" />
      </div>
      <div class="stepper__content">
        <h2 class="main-title">¡Gracias!</h2>
        <p class="description">
          Apreciamos que te tomaras el tiempo de responder las preguntas. Sigue
          <router-link class="link--text" to="/dashboard" tag=""
            >este</router-link
          >
          enlace para ir al dashboard y ver los resultados.
        </p>
      </div>
      <!-- <div class="stepper__footer">
        <router-link class="dashboard-link ripple" to="/dashboard" tag="a"
          >Dashboard</router-link
        >
      </div> -->
    </template>
  </section>
</template>

<script lang="ts">
import iconThankYou from "../../../assets/images/icon_thank-you.svg";
import iconStar from "../icons/iconStar.vue";
import { defineComponent } from "vue";

// STORE
import { useSurveyStore } from "../../../stores/survey";
import { mapState } from "pinia";

export default defineComponent({
  components: { iconStar },
  data() {
    return {
      show: true,
      iconThankYou,
      inProcess: false,
      isCompleted: false,

      // FORM DATA
      email: "" as string,
      emailTouched: false as boolean,
      emailError: false as boolean,

      oldAge: undefined as string | undefined,
      oldAgeTouched: false as boolean,
      oldAgeError: false as boolean,

      gender: undefined as string | undefined,
      genderTouched: false as boolean,
      genderError: false as boolean,

      favoriteSocialMedia: undefined as string | undefined,
      favoriteSocialMediaTouched: false as boolean,
      favoriteSocialMediaError: false as boolean,

      facebookTime: 0,
      whatsTime: 0,
      twitterTime: 0,
      instagramTime: 0,
      tiktokTime: 0,
      youtubeTime: 0,

      // STEPPER DATA
      currentStep: 1,
      minStep: 1,
      maxStep: 4,
    };
  },
  computed: {
    ...mapState(useSurveyStore, {
      // myOwnName: "ageRanges",
      ageRanges: (store) => store.ageRanges,
      socialMedias: (store) => store.socialMedias,
      loadSurveys: (store) => store.getSurveysData,
    }),
  },
  methods: {
    isSurveyCompleted() {
      return (
        !this.emailError &&
        !!this.email &&
        !!this.oldAge!! &&
        !!this.gender &&
        !!this.favoriteSocialMedia
      );
    },
    goToStep(stepNumber: number): void {
      if (stepNumber < this.minStep || stepNumber > this.maxStep) {
        throw new Error("El paso al que deseas ir no existe");
      }
      this.currentStep = stepNumber;
    },
    nextStep(): void {
      this.currentStep =
        this.currentStep === this.maxStep ? this.minStep : this.currentStep + 1;
    },
    prevStep(): void {
      this.currentStep =
        this.currentStep === this.minStep ? this.maxStep : this.currentStep - 1;
    },
    async submit() {
      const data = {
        email: this.email,
        ageRangeId: this.oldAge,
        genderId: this.gender,
        favSocialMedia: this.favoriteSocialMedia,
        hours: {
          facebook: this.facebookTime,
          whatsapp: this.whatsTime,
          twitter: this.twitterTime,
          instagram: this.instagramTime,
          tiktok: this.tiktokTime,
          youtube: this.youtubeTime,
        },
      };
      await fetch(
        "https://emqusurvey-bd-default-rtdb.firebaseio.com/surveys.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async saveSurvey(): Promise<any> {
      if (this.currentStep < this.maxStep) {
        this.nextStep();
        return;
      }
      if (this.currentStep === this.maxStep) {
        if (!this.inProcess) {
          this.inProcess = true;
          await this.submit();
          await this.loadSurveys();
          this.isCompleted = true;
        }
      }
    },
  },
  watch: {
    email(val: string) {
      this.emailError = !val.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    oldAge(val: string | undefined) {
      this.oldAgeError = val === undefined;
    },
    gender(val: string | undefined) {
      this.genderError = val === undefined;
    },
    favoriteSocialMedia(val: string) {
      this.favoriteSocialMediaError = val.trim() === "";
    },
  },
});
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
  transition: all 1s ease;

  &__head {
    .icons {
      margin-bottom: 40px;
      display: flex;
      gap: 10px;
      // background-color: $dark-blue;
    }
    .main-title {
      @extend %main-title;
    }
  }
  &__content {
    transition: all 1s ease;
    .statement {
      @extend %description;
    }
  }
  &__footer {
    margin-top: 25px;
    text-align: center;
    .dashboard-link {
      text-decoration: none;
      background-color: $accent;
      line-height: 0;
      color: $white;
      padding: 0.5em 1.5em;
      border-radius: 0.5em;
    }
  }
  .group {
    margin-bottom: 15px;
    .label {
      margin-bottom: 0.5em;
      display: grid;
      grid-template-columns: 70% auto;
      margin-left: 1em;
      margin-right: 1em;
      &__title {
        // background-color: $success;
        line-height: 1.3;
        font-weight: bold;
        letter-spacing: 0.25px;
        opacity: 0.75;
        font-size: 0.85em;
      }
      &__time {
        // background-color: teal;
        justify-self: end;
        align-self: center;
        font-size: 0.9em;
        font-weight: bold;
        opacity: 0.5;
      }
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
          // background-color: $success;
        }
        option[selected] {
          // color: red;
        }
      }

      &:focus {
        background-color: $dark-blue;
        outline: 0;
      }
    }
    input[type="range"] {
      -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
      width: 100%; /* Specific width is required for Firefox. */
      background: transparent; /* Otherwise white in Chrome */
      &::-moz-range-track {
        background-color: $accent;
        border: 0;
        border-radius: 5px;
        height: 5px;
      }

      // TRACKER
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: $accent;
        border-radius: 5px;
        border: 0;
      }

      &:focus::-webkit-slider-runnable-track {
        background: $success;
      }

      &::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: $accent;
        border-radius: 5px;
        border: 0;
      }

      &::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
      }
      &::-ms-fill-lower {
        background: $success;
        border: 0;
        border-radius: 5px;
      }
      &:focus::-ms-fill-lower {
        background: $accent;
      }
      &::-ms-fill-upper {
        background: $accent;
        border: 0;
        border-radius: 5px;
      }
      &:focus::-ms-fill-upper {
        background: $success;
      }

      // THUMB
      /* Special styling for WebKit/Blink */
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 0;
        height: 15px;
        width: 15px;
        border-radius: 18px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        box-shadow: 0; /* Add cool effects to your sliders! */
      }

      /* All the same stuff for Firefox */
      &::-moz-range-thumb {
        box-shadow: 0;
        border: 0;
        height: 15px;
        width: 15px;
        border-radius: 18px;
        background: #ffffff;
        cursor: pointer;
      }

      /* All the same stuff for IE */
      &::-ms-thumb {
        box-shadow: 0;
        border: 0;
        height: 15px;
        width: 15px;
        border-radius: 18px;
        background: #ffffff;
        cursor: pointer;
      }
    }
    .validation-error {
      background-color: $danger;
      display: block;
      margin: 0 auto;
      width: max-content;
      font-size: 0.85em;
      padding: 15px 30px;
      margin-top: 5px;
      border-radius: 15px;
      line-height: 0;
    }
  }
  .step-3,
  .step-4 {
    // background: coral;
    .group {
      margin-bottom: 25px;
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
    // background-color: $dark-blue;
    &:hover {
      color: $white;
      background-color: $accent;
      letter-spacing: 1px;
    }
    &--icon {
      @extend .btn;
      background-color: $dark-blue;
      // padding: 10px 12px;
      width: max-content;
      height: max-content;
      border: 0;

      &:focus {
        outline: 0;
      }
      img {
        width: 15px;
        // opacity: 0.1;
      }
      &:hover {
        color: transparent;
        background-color: transparent;
        // letter-spacing: 1px;
      }
      &.active {
        // opacity: 1;
      }
    }
  }
  &.completed {
    // background-color: $success;
    .main-title {
      @extend %main-title;
      text-align: center;
    }
    .description {
      @extend %description;
      text-align: center;
    }
    .stepper__header {
      text-align: center;
    }
    .icon-thank {
      width: 150px;
      height: auto;
      margin-bottom: 20px;
    }
  }
}
.bounce-enter-active {
  animation: intro 0.5s ease;
}
.bounce-leave-active {
  animation: leave-out 0.25s 0.25s ease-in-out;
}
@keyframes leave-out {
  0% {
    transform: translateX(0%) scale(1);
    height: auto;
    opacity: 1;
  }
  50% {
    transform: translateX(50%);
    height: 50px;
    opacity: 0.5;
  }
  100% {
    transform: translateX(100%) scale(0.5);
    height: 0px;
    opacity: 0;
  }
}
@keyframes intro {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
img {
  width: 100%;
  height: auto;
}
</style>