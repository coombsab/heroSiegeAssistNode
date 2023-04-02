import { AppState } from "../AppState"
import { MyRune } from "../models/MyRune"
import { Rune } from "../models/Rune"
import { Runeword } from "../models/Runeword"
import { api } from "./AxiosService"

class RunewordsService {
  async getRunewords() {
    const res = await api.get("/api/runewords")
    AppState.runewords = res.data.map(data => new Runeword(data))
  }

  async addRuneword(runewordData) {
    AppState.tempAbilities = []
    AppState.tempEffects = []
    AppState.tempItems = []
    AppState.tempRunes = []

    let abilities = []
    let items = []
    let runes = []
    let effects = []

    runewordData.abilities.forEach(ability => abilities.push(AppState.abilities.find(a => a.name === ability)))
    runewordData.abilities = abilities
    runewordData.items.forEach(item => items.push(AppState.items.find(i => i.name === item)))
    runewordData.items = items
    runewordData.runes.forEach(rune => runes.push(AppState.runes.find(r => r.name === rune)))
    runewordData.runes = runes
    runewordData.effects.forEach(effect => effects.push({ name: effect }))
    runewordData.effects = effects


    const res = await api.post("/api/runewords", runewordData)
    AppState.runewords.push(new Runeword(res.data))
  }

  async editRuneword(runewordId, runewordData) {
    console.log("Editing runeword in runewordsService")
  }

  async deleteRuneword(runewordId) {
    // console.log("runewordId", runewordId)
    const res = await api.delete("/api/runewords/" + runewordId)
    AppState.runewords = AppState.runewords.filter(rw => rw.id !== runewordId)
  }

  setActiveRuneword(runeword) {
    // this.clearRunewordSubmission()
    AppState.activeRuneword = runeword
  }

  clearRunewordSubmission() {
    // console.log("Clearing temp info")
    // console.log("effects before", AppState.tempEffects)
    // console.log("abilities before", AppState.tempAbilities)
    // console.log("runes before", AppState.tempRunes)
    // console.log("items before", AppState.tempItems)
    // AppState.tempEffects = []
    // AppState.tempAbilities = []
    // AppState.tempRunes = []
    // AppState.tempItems = []
    // console.log("effects after", AppState.tempEffects)
    // console.log("abilities after", AppState.tempAbilities)
    // console.log("runes after", AppState.tempRunes)
    // console.log("items after", AppState.tempItems)
  }

  highlightIfRuneOwned(runeword, rune, index) {
    const element = document.getElementById(runeword.id + '-' + rune.id + '-' + index)
    const tempRunes = []
    AppState.myRunes.forEach(myRune => {
      tempRunes.push(new MyRune(myRune))
    })

    if (!element) {
      return
    }

    const foundRune = tempRunes.find(myRune => myRune.name === rune.name)
    if (!foundRune) {
      console.log(runeword.name + " | " + rune.name + " had no match")
      return
    }
    if (foundRune.quantity >= 1) {
      console.log(runeword.name + " | " + foundRune.name + " with qty " + foundRune.quantity)
      foundRune.quantity--
      element.classList.remove("rune-darken")
      element.classList.add("rune-brighten")
    } else {
      console.log(runeword.name + " | " + foundRune.name + " with qty " + foundRune.quantity)
      return
    }    
  }

  checkForRunewords() {
    let myRunesTemp = []
    AppState.possibleRunewords = []
    AppState.myRunes.forEach(r => myRunesTemp.push(new MyRune(r)))

    let hasRunes = true

    AppState.runewords.forEach(runeword => {
      runeword.runes.forEach(rune => {
        let myRune = myRunesTemp.find(r => r.name === rune.name)

        if (!myRune) {
          hasRunes = false
        } else {
          if (myRune.quantity >= 1) {
            myRune.quantity--
          } else {
            hasRunes = false
          }
        }
      })
      if (hasRunes) {
        AppState.possibleRunewords.push(runeword)
      } else {
        hasRunes = true
      }
      myRunesTemp = []
      AppState.myRunes.forEach(r => myRunesTemp.push(new MyRune(r)))

    })

  }
}

export const runewordsService = new RunewordsService()