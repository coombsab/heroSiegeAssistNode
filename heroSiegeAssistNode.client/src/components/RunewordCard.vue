<template>
  <div class="runeword-card text-visible flex-shrink-1">
    <div class="card-wrapper d-flex flex-column p-3">
      <div class="runes-needed d-flex gap-1 flex-wrap justify-content-around px-3">
        <!-- <p v-for="r in runeword.runes" :key="runeword.name + '-' + r.name">{{r.name}}</p> -->
        <div class="d-flex flex-column align-items-center rune-darken" :class="hasRune(r, index)" v-for="(r, index) in runeword.runes"
          :key="runeword.id + '-' + r.id + '-' + index" :id="runeword.id + '-' + r.id + '-' + index">
          <img :src="r.img" :alt="r.name">
          <p class="m-0 rune-name">{{ r.name }}</p>
        </div>
      </div>
      <p class="mb-2 fs-3 text-visible text-center capitalize">{{ runeword.name }}</p>
      <div class="effects mb-2">
        <p class="m-0 text-center" v-for="e in runeword.effects" :key="e.id">{{ e.name }}</p>
      </div>
      <div class="abilities">
        <p class="m-0 text-center" v-for="a in runeword.abilities" :key="a.id">{{ a.name }}</p>
      </div>
      <RunewordCardOptions :runeword="runeword" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import RunewordCardOptions from "./RunewordCardOptions.vue";
import { runewordsService } from "../services/RunewordsService";
import { MyRune } from "../models/MyRune";

export default {
  props: {
    runeword: { type: Object }
  },
  setup(props) {
    function hasRune() {
      const myRunes = []
      AppState.myRunes.forEach(myRune => {
        myRunes.push(new MyRune(myRune))
      })
      props.runeword.runes.forEach((rune, index) => {
        if (myRunes.length === 0) {
          return
        }

        const element = document.getElementById(props.runeword.id + '-' + rune.id + '-' + index)
        if (!element) {
          return
        }

        const foundRune = myRunes.find(myRune => myRune.name === rune.name)
        if (!foundRune) {
          return
        }
        if (foundRune.quantity >= 1) {
          foundRune.quantity--
          element.classList.remove("rune-darken")
          // element.classList.add("rune-brighten")

        } else {
          return
        }
      })
    }

    onMounted(() => {
      hasRune()
    })

    return {
      myRunes: computed(() => {
        let tempRunes = []
        AppState.myRunes.forEach(myRune => {
          tempRunes.push(new MyRune(myRune))
        })
        return tempRunes
      }),
      hasRune(rune, index) {
        if (this.myRunes.length === 0) {
          return
        }

        const element = document.getElementById(props.runeword.id + '-' + rune.id + '-' + index)
        if (!element) {
          return
        }

        const foundRune = this.myRunes.find(myRune => myRune.name === rune.name)
        if (!foundRune) {
          return
        }
        if (foundRune.quantity >= 1) {
          foundRune.quantity--
          element.classList.remove("rune-darken")
          // element.classList.add("rune-brighten")

        } else {
          return
        }




        // runewordsService.highlightIfRuneOwned(props.runeword, rune, index)
      }
    };
  },
  components: { RunewordCardOptions }
}
</script>

<style scoped lang="scss">
.runeword-card {
  border-radius: 1rem;
  // height: 48vh;
  width: 70vw;
  background-color: purple;
  background-image: url(../assets/img/HeroSiegeRuneWord.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  // box-shadow: 10px 5px 5px teal;
  // box-shadow: 0px 5px 10px 0px rgba(0, 255, 255, 0.7);
  box-shadow: 0.5px 0.5px 10px 0px rgba(0, 255, 255, 0.25), -0.5px -0.5px 10px 0px rgba(0, 255, 255, 0.25);
  position: relative;
}

.runeword-card:hover {
  // transform: translateY(-10px);
  // box-shadow: inset 0px 5px 10px 5px rgba(0,255,255,0.7);

}

.runes-needed {
  width: 100%;
}

.rune-name {
  font-size: 10px;
  // text-transform: capitalize;
}

.rune-darken {
  filter: brightness(0.35);
}

// .rune-brighten {
//   filter: drop-shadow(1px 1px 5px rgba(255, 255, 255, 0.25));
// }

.effects {
  color: rgb(0, 185, 185);
}

img {
  height: 25px;
  width: 20px;
}

.card-wrapper {
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;

  >button {
    background-color: transparent;
    border: none;
    height: 100%;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .runeword-card {
    height: 28rem;
    width: 16rem;
  }
}
</style>