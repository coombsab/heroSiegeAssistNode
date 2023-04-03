<template>
  <!-- TODO probably need to rework this whole thing -->
  <div class="add-runeword-form">
    <div class="title mb-3 px-3 d-flex justify-content-between align-items-center">
      <p class="fs-4 m-0 text-visible">Edit Runeword</p>
      <button type="submit" form="editRunewordForm" :disabled="checkIfDisable()" data-bs-dismiss="modal"><i
          class="mdi mdi-plus-outline fs-4 text-visible"></i></button>
    </div>

    <form @submit.prevent="handleSubmit()" id="editRunewordForm">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="form-floating mb-3">
              <input type="text" class="form-control bg-dark text-secondary text-lighten-3" id="floatingInputRunewordName"
                placeholder="Name" v-model="editable.name">
              <label for="floatingInputRunewordName" class="text-secondary text-lighten-3">Name</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating mb-3 select-wrapper">
              <select class="form-control bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordItemSlot"
                placeholder="ItemSlot" v-model="editable.itemSlot">
                <option v-for="i in possibleItemSlots" :value="i">{{ i }}</option>
              </select>
              <label for="floatingSelectRunewordItemSlot" class="text-secondary text-lighten-3">ItemSlot</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating mb-3 select-wrapper">
              <select class="form-control bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordItemType"
                placeholder="ItemType" v-model="editable.itemType">
                <option v-for="i in possibleItemTypes" :value="i">{{ i }}</option>
              </select>
              <label for="floatingSelectRunewordItemType" class="text-secondary text-lighten-3">ItemType</label>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 mb-1">
            <div class="input-group">
              <div class="form-floating">
                <input type="text" class="form-control bg-dark text-secondary text-lighten-3"
                  id="floatingInputRunewordEffect" placeholder="Effect Value" v-model="effectEditable.value">
                <label for="floatingInputRunewordEffect" class="text-secondary text-lighten-3">Effect Value</label>
              </div>
              <div class="form-floating">
                <select class="form-select bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordEffectText"
                  v-model="effectEditable.text">
                  <option v-for="e in effectsText" :key="e.name" :value="e.name">{{ e.name }}</option>
                </select>
                <label for="floatingSelectEffectText" class="text-secondary text-lighten-3">Effect Text</label>
              </div>
              <button type="button" @click="handleSubmitEffect()" class="rounded-end bg-dark"><i
                  class="mdi mdi-plus text-secondary text-lighten-3"></i></button>
            </div>
          </div>
          <div class="col-12">
            <p class="m-0 text-secondary text-lighten-3 fw-1 px-1">Effects Added:</p>
            <div class="d-flex gap-1 align-items-center justify-content-between added-item" v-for="eff in editable?.effects">
              <p class="m-0 text-secondary no-select">{{ eff.name }}</p>
              <button type="button" @click.stop="removeEffect(eff)"><i
                  class="mdi mdi-delete-circle text-secondary"></i></button>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 mb-1">
            <div class="d-flex justify-content-between gap-4">
              <div class="input-group">
                <div class="form-floating flex-grow-1">
                  <select class="form-select bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordAbility"
                    v-model="abilityEditable.name">
                    <option v-for="a in abilities" :key="a?.name" :value="a?.name">{{ a?.name }}</option>
                  </select>
                  <label for="floatingSelectAbility" class="text-secondary text-lighten-3">Ability</label>
                </div>
                <button type="button" @click="handleSubmitAbility()" class="rounded-end bg-dark"><i
                    class="mdi mdi-plus text-secondary text-lighten-3"></i></button>
              </div>
            </div>
          </div>
          <div class="col-12">
            <p class="m-0 text-secondary text-lighten-3 fw-1 px-1">Abilities Added:</p>
            <div class="d-flex gap-1 align-items-center justify-content-between added-item" v-for="abil in editable?.abilities">
              <p class="m-0 text-secondary no-select">{{ abil.name }}</p>
              <button type="button" @click.stop="removeAbility(abil)"><i
                  class="mdi mdi-delete-circle text-secondary"></i></button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="input-group">
              <div class="form-floating">
                <select class="form-select bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordRunes"
                  v-model="runeEditable.rune">
                  <option class="rune-option" v-for="r in runes" :value="r.name">{{ r.name }}</option>
                </select>
                <label for="floatingSelectRunewordRunes" class="text-secondary text-lighten-3">Add Rune</label>
              </div>
              <button type="button" @click="handleSubmitRunes()" class="rounded-end bg-dark"><i
                  class="mdi mdi-plus text-secondary text-lighten-3"></i></button>
            </div>
            <div class="d-flex gap-1 text-secondary justify-content-end align-items-center">
              <p class="m-0">selected:</p>
              <p class="m-0" :class="editable.runes?.length > 6 ? 'rune-alert' : ''">{{
                editable.runes?.length
              }}</p>
            </div>
          </div>
          <div class="col-12 mb-3">
            <p class="m-0 text-secondary text-lighten-3 fw-1 px-1">Runes Added:</p>
            <div class="d-flex gap-1 align-items-center justify-content-between added-item"
              v-for="(r, index) in editable?.runes" :key="'edit-' + r + '-' + index">
              <p class="m-0 text-secondary no-select">{{ r.name }}</p>
              <button type="button" @click.stop="removeRune(r)"><i
                  class="mdi mdi-delete-circle text-secondary"></i></button>
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="form-floating">
                <select class="form-select bg-dark text-secondary text-lighten-3" id="floatingSelectRunewordItems"
                  v-model="itemEditable" multiple>
                  <option v-for="i in items" :value="i.name">{{ i.name }}</option>
                </select>
                <label for="floatingSelectRunewordItems" class="text-secondary text-lighten-3">Add Item</label>
              </div>
              <button type="button" @click="handleSubmitItems()" class="rounded-end bg-dark"><i
                  class="mdi mdi-plus text-secondary text-lighten-3"></i></button>
            </div>
          </div>
          <div class="col-12">
            <p class="m-0 text-secondary text-lighten-3 fw-1 px-1">Items Added:</p>
            <div class="d-flex gap-1 align-items-center justify-content-between added-item" v-for="i in editable?.items">
              <p class="m-0 text-secondary no-select">{{ i.name }}</p>
              <button type="button" @click.stop="removeItem(i)"><i
                  class="mdi mdi-delete-circle text-secondary"></i></button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { AppState } from "../AppState";
import { abilitiesService } from "../services/AbilitiesService";
import { effectsService } from "../services/EffectsService";
import { itemsService } from "../services/ItemsService";
import { runesService } from "../services/RunesService";
import { runewordsService } from "../services/RunewordsService";
import Pop from "../utils/Pop";
import AddedItem from "./AddedItem.vue";

export default {
  setup() {
    const editable = ref({});
    const effectEditable = ref({});
    const abilityEditable = ref({});
    const runeEditable = ref({});
    const itemEditable = ref([]);


    watchEffect(() => {
      editable.value = { ...AppState.activeRuneword }
    })

    return {
      editable,
      effectEditable,
      abilityEditable,
      runeEditable,
      itemEditable,
      effectsText: computed(() => AppState.effectsText),
      runes: computed(() => AppState.runes.sort((a, b) => a.name.localeCompare(b.name))),
      items: computed(() => AppState.items.sort((a, b) => a.name.localeCompare(b.name))),
      abilities: computed(() => AppState.abilities.sort((a, b) => a.name.localeCompare(b.name))),
      possibleItemSlots: computed(() => AppState.possibleItemSlots),
      possibleItemTypes: computed(() => AppState.possibleItemTypes),
      async handleSubmit() {
        try {
          // console.log("Submitting edits to runeword", editable.value)
          // await runewordsService.editRuneword(editable.value);
          // editable.value = {};
          effectEditable.value = {};
          runeEditable.value = {};
          itemEditable.value = [];
          abilityEditable.value = {};
        }
        catch (error) {
          Pop.error(error.message, "[handleSubmit] > EditRunewordForm");
        }
      },
      handleSubmitRunes() {
        if (editable.value.runes.length < 6) {
          // console.log("Adding rune")
        } else {
          Pop.toast(`Only 6 runes can be added at one time.`, "warning", "center")
        }
      },
      handleSubmitItems() {
        // console.log("Adding item")
      },
      handleSubmitEffect() {
        // console.log("Adding effect")
      },
      handleSubmitAbility() {
        // console.log("Adding ability")
      },
      checkIfDisable() {
        if (editable.value.effects?.length > 0 && editable.value.items?.length > 0 && editable.value.runes?.length > 0 && Object.keys(editable.value).length >= 3) {
          return false;
        }
        else {
          return true;
        }
      },
      removeEffect(effect) {
        // console.log("Removing effect", effect)
      },
      removeAbility(ability) {
        // console.log("Removing ability", ability)
      },
      removeRune(rune) {
        // console.log("Removing rune", rune)
      },
      removeItem(item) {
        // console.log("Removing item", item)
      },
    };
  },
  components: { AddedItem }
}
</script>

<style scoped lang="scss">
button {
  background-color: transparent;
  // background-color: green;
  border: none;
}

button:hover {
  filter: drop-shadow(0.5px 0.5px 5px rgba(0, 255, 255, 0.25));
}

.w-30 {
  width: 30%;
}

// button {
//   background-color: red;
//   border: 1px solid #ced4da;
// }

#floatingSelectRunewordRunes {
  border-right: none;
}

#floatingSelectRunewordItems {
  border-right: none;
  height: 15rem;
}

.fw-1 {
  font-weight: 700;
}

.added-item {
  padding-left: 0.5rem;
  padding-right: 0.25rem;
  border-radius: 0.375rem;
}

.added-item:hover {
  background-color: rgba(128, 0, 128, 0.25);
}

.rune-alert {
  color: red;
  font-weight: 1000;
  animation: beat .25s infinite alternate;
  transform-origin: center;
}

@keyframes beat {
  to {
    transform: scale(1.2);
  }
}
</style>