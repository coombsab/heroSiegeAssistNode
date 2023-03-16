import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { runesService } from "./RunesService"

class RunewordsService {
  async getRunewords(query = {}) {
    const runewords = await dbContext.Runewords.find(query)
    return runewords
  }

  async addRuneword(runewordData) {
    const runeword = await dbContext.Runewords.create(runewordData)
    return runeword
  }

  async getRunewordbyId(runewordId) {
    const runeword = await dbContext.Runewords.findById(runewordId)
    if (!runeword) {
      throw new BadRequest("Could not find a runeword by that ID.")
    }
    return runeword
  }

  async editRuneword(runewordData, runewordId) {
    const runeword = await this.getRunewordbyId(runewordId)
    runeword.name = runewordData.name || runeword.name
    runeword.itemSlot = runewordData.itemSlot || runeword.itemSlot
    runeword.itemType = runewordData.itemType || runeword.itemType
    runeword.runes = runewordData.runes || runeword.runes
    runeword.abilities = runewordData.abilities || runeword.abilities
    runeword.effects = runewordData.effects || runeword.effects
    runeword.items = runewordData.items || runeword.items
    await runeword.save()
    return runeword
  }

  async deleteRuneword(runewordId) {
    const runeword = await this.getRunewordbyId(runewordId)
    await runeword.remove()
    return runeword
  }
}

export const runewordsService = new RunewordsService()