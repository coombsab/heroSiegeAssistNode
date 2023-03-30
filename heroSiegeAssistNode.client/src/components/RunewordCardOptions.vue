<template>
  <div class="options-icon">
    <button @click="toggleOptions()"><i class="mdi mdi-menu-up fs-4"></i></button>
  </div>
  <div class="popover-wrapper px-2 hidden" :id="'popover-' + runeword.name">
    <div class="popover-content gap-2">
      <button @click="deleteRuneword()"><i class="mdi mdi-delete"></i></button>
      <button @click="editRuneword(runeword)" data-bs-toggle="modal" :data-bs-target="'#editRunewordModal'"><i class="mdi mdi-cog"></i></button>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState"
import { accountService } from "../services/AccountService"
import { runewordsService } from "../services/RunewordsService"
import Pop from "../utils/Pop"

export default {
  props: {
    runeword: { type: Object }
  },

  setup(props) {

    return {
      toggleOptions() {
        let popoverElement = document.getElementById(`popover-${props.runeword.name}`)
        if (!popoverElement) {
          return
        }
        popoverElement.classList.toggle("hidden")
      },
      async deleteRuneword() {
        const yes = await Pop.confirm("Do you want to delete " + props.runeword.name + "?")
        if (!yes) {
          return
        }
        await runewordsService.deleteRuneword(props.runeword.id)
        
      },
      editRuneword(runeword) {
        runewordsService.setActiveRuneword(runeword)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.options-icon {
  position: absolute;
  bottom: 0;
  left: 5px;
}

button {
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: rgb(105, 1, 105);
  // z-index: 1;
}

button:hover {
  filter: drop-shadow(0.5px 0.5px 5px rgba(0, 255, 255, 0.45));
  color: rgb(185, 3, 185);
}

.popover-wrapper {
  position: absolute;
  bottom: 5px;
  left: 50%;
  border-radius: 0 0 1rem 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX(-50%);
}

.popover-content {
  backdrop-filter: blur(1px);
  color: rgb(105, 1, 105);
  display: flex;
}
</style>