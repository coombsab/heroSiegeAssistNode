import { dbContext } from "../db/DbContext"
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
}

export const runewordsService = new RunewordsService()