<template>
  <div class="runeword-card text-visible flex-shrink-1">
    <div class="card-wrapper d-flex flex-column p-3">
      <div class="runes-needed d-flex gap-1 flex-wrap justify-content-around px-3">
        <!-- <p v-for="r in runeword.runes" :key="runeword.name + '-' + r.name">{{r.name}}</p> -->
        <div class="d-flex flex-column align-items-center" :class="hasRune(r)" v-for="r in runeword.runes"
          :key="runeword.name + '-' + r.name">
          <img :src="r.img" :alt="r.name">
          <p class="m-0 rune-name">{{ r.name }}</p>
        </div>
      </div>
      <p class="fs-3 text-visible text-center capitalize">{{ runeword.name }}</p>
      <div class="effects">
        <p class="m-0 text-center" v-for="e in runeword.effects" :key="e.id">{{ e.name }}</p>
      </div>
      <RunewordCardOptions :runeword="runeword" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted} from "vue";
import { AppState } from "../AppState";

export default {
  props: {
    runeword: { type: Object }
  },

  setup(props) {
    const tempRuneQuantities = []

    function setTempRuneQuantities() {
      props.runeword.runes.forEach(rune => {
        const existingRune = tempRuneQuantities.find(r => rune.name === r.name)
        if (!existingRune) {
          tempRuneQuantities.push({ name: rune.name, quantity: 1, isFirstCheck: true })
        } else {
          existingRune.quantity++
        }
      })
    }

    onMounted(() => {
      setTempRuneQuantities()
    })

    return {
      /*REVIEW - If this file is saved and vue updates the page then the runes shown based off quantity is inaccurate; may need to look into this, may only be a bug for when editing the code but never actually hit production*/
      hasRune(rune) {
        const foundRune = AppState.myRunes.find(myRune => myRune.name === rune.name)
        let tempRune = tempRuneQuantities.find(r => r.name === rune.name)
        console.log("temp rune", tempRune)
        if (!foundRune) {
          // console.log("Rune not found, darkening", rune.name)
          return "rune-darken"
        } else {
          if (!tempRune) {
            return
          }
          if (tempRune.isFirstCheck) {
            // console.log("Brightening", rune.name)
            tempRune.isFirstCheck = false
            return "rune-brighten"
          } else {
            if (foundRune.quantity < tempRune.quantity) {
              // console.log("Quantity too low, darkening", rune.name)
              return "rune-darken"
            }
          }
        }
        
        
        // if (tempRune.quantity === 0) {
        //   console.log("Rune quantity 0, darkening", rune.name)
        //   return "rune-darken"
        // } else if (tempRune.quantity > 0) {
        //   tempRune.quantity--
        //   console.log("Brightening", rune.name)
        //   return "rune-brighten"
        // }
      }
    }
  }
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

.rune-brighten {
  // filter: drop-shadow(1px 1px 5px rgba(255, 255, 255, 0.25));
}

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