<template>
  <div class="rune-card" :class="rune.possibleRunewords?.length === 0 || !rune.possibleRunewords ? 'empty' : ''">
    <div class="rune-card-inner">
      <div class="rune-card-front">
        <div class="card-wrapper d-flex flex-column p-3 text-visible"
          :class="rune.possibleRunewords?.length > 0 ? 'highlight' : ''">
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex gap-1 align-items-center">
              <img :src="rune.img" :alt="rune.name">
              <p class="fs-5" :title="rune.effect">{{ rune.name }}</p>
              <p v-if="rune.quantity">({{ rune.quantity }})</p>
            </div>
            <img :src="'/src/assets/img/' + rune.tier + '.png'" :alt="rune.tier" class="rune-tier">
          </div>
          <div class="flex-grow-1 d-flex justify-content-center align-items-center">
            <p class="darken-text">{{ rune.effect }}</p>
          </div>
          <div class="drop-rate darken-text">{{ convertDroprate() }}</div>
          <div class="flip-icon" v-if="rune.possibleRunewords?.length > 0"><i class="mdi mdi-orbit-variant"></i></div>
          <RuneCardOptions v-if="rune.possibleRunewords?.length === 0 && route.name === 'MyRunes'" :rune="rune"
            :side="'front'" />
        </div>
      </div>
      <div class="rune-card-back">
        <div class="card-wrapper d-flex flex-column p-3 text-visible">
          <div class="d-flex flex-column align-items-center flex-shrink-1">
            <div class="d-flex gap-1 align-items-center">
              <img :src="rune.img" :alt="rune.name">
              <p class="fs-5" :title="rune.effect">{{ rune.name }}</p>
              <p v-if="rune.quantity">({{ rune.quantity }})</p>
            </div>
            <img :src="'/src/assets/img/' + rune.tier + '.png'" :alt="rune.tier" class="rune-tier">
          </div>
          <div class="possible-runewords d-flex flex-column">
            <div class="mb-1" v-for="(r, index) in rune.possibleRunewords" :key="r.name">
              <div class="outer-border">
                <img class="corner-decoration corner-left-top" src="../assets/img/corner-decoration-removebg.png">
                <img class="corner-decoration corner-right-bottom" src="../assets/img/corner-decoration-removebg.png">
                <p class="m-0 darken-text">{{ r.name }}</p>
              </div>
            </div>
          </div>
          <RuneCardOptions :rune="rune" :side="'back'" v-if="route.name === 'MyRunes'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import RuneCardOptions from "./RuneCardOptions.vue"

export default {
  props: {
    rune: { type: Object }
  },
  setup(props) {
    const route = useRoute();
    return {
      route,
      convertDroprate() {
        let leftNum = props.rune.dropRate[0];
        let rightNum = props.rune.dropRate.substring(2);
        return (Math.round(((leftNum / rightNum) * 100) * 10000) / 10000) + "%";
      }
    };
  },
  components: { RuneCardOptions }
}
</script>

<style scoped lang="scss">
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.rune-card {
  background-color: transparent;
  height: 12rem;
  width: 8rem;
  // border: 1px solid #f1f1f1;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.rune-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.rune-card:not(.empty):hover .rune-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.rune-card-front,
.rune-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
}

/* Style the back side */

.rune-card-front {
  border-radius: 1rem;
  background-color: purple;
  background-image: url(../assets/img/HeroSiegeRuneWord.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  // box-shadow: 10px 5px 5px teal;
  // box-shadow: 0px 5px 10px 0px rgba(0, 255, 255, 0.7);
  // box-shadow: 0.5px 0.5px 10px 0px rgba(0,255,255,0.25), -0.5px -0.5px 10px 0px rgba(0,255,255,0.25);
}

.rune-card-back {
  border-radius: 1rem;
  background-color: purple;
  background-image: url(../assets/img/HeroSiegeRuneWord.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotateY(180deg);
  box-shadow: 0.5px 0.5px 10px 0px rgba(105, 1, 105, 0.75), -0.5px -0.5px 10px 0px rgba(105, 1, 105, 0.75);
}

.card-wrapper {
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  // align-items: center;
  // justify-items: center;
  position: relative;
}

img {
  height: 25px;
  width: 20px;
}

.rune-title {
  width: 4.75rem;
  // background-color: purple;
}

.darken-text {
  color: rgb(0, 185, 185);
}

p {
  margin: 0;
}

.rune-tier {
  // font-size: 10px;
  // color: rgb(0,185,185);
  height: 20px;
  width: 20px;
  filter: drop-shadow(0px 0px 5px rgba(255, 0, 0, 0.9));
}

.drop-rate {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
}

.flip-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: rgb(105, 1, 105);
  // filter: drop-shadow(0px 0px 1px rgba(105, 1, 105, 0.75));
  animation: beat .25s infinite alternate;
  transform-origin: center;
}

.possible-runewords {
  flex-grow: 1;
  overflow-y: auto;
}

.possible-runewords::-webkit-scrollbar {
  width: 5px;
  color: white;
}

.possible-runewords::-webkit-scrollbar-track {
  background-color: black;
}

.possible-runewords::-webkit-scrollbar-thumb {
  background-color: blue;
  // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.possible-runewords::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 255, 0.639);
}

.separator {
  height: 1px;
  background-color: rgba(206, 205, 206, 0.491);
  margin-left: 5px;
  margin-right: 5px;
}

.highlight {
  box-shadow: 0.5px 0.5px 10px 0px rgba(105, 1, 105, 0.75), -0.5px -0.5px 10px 0px rgba(105, 1, 105, 0.75);
}

@media (min-width: 768px) {
  .rune-card {
    height: 12rem;
    width: 8rem;
  }
}

@keyframes beat {
  to {
    transform: scale(1.2);
  }
}

/**border experiment */
.outer-border {
  position: relative;
  border: 2px solid #DE9B72;
  margin: 0 auto;
}

.corner-decoration {
  position: absolute;
}

.corner-decoration.corner-left-top {
  left: 0;
  top: 0;
}

.corner-decoration.corner-right-bottom {
  right: 0;
  bottom: 0;
  transform: scale(-1);
}
</style>


