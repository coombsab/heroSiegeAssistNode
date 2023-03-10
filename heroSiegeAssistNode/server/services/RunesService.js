import { Forbidden, BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"

class RunesService {
  async getRunes(query = {}) {
    const runes = await dbContext.Runes.find(query)
    await this.getPossibleRunewords(runes)

    return runes
  }

  async getPossibleRunewords(runes) {
    const runewords = await dbContext.Runewords.find()
    runes.forEach(rune => {
      const possibleRunewords = []
      runewords.forEach(runeword => {
        runeword.runes.forEach(r => {
          if (rune.name === r.name) {
            possibleRunewords.push(runeword)
          }
        })
      })
      rune.possibleRunewords = possibleRunewords
    })

    return runes
  }

  async getRunewordsByRune(query = {}) {
    const possibleRunewords = await dbContext.Runewords.find(query)
    return possibleRunewords
  }

  async getRunesByAccountId(query = {}) {
    const runes = await dbContext.Runes.find(query)
    return runes
  }

  async getRunesForAccounts(query = {}) {
    const runes = await dbContext.Runes.find(query)
    return runes
  }

  async getAccountsWithRunes(query = {}) {
    const accounts = await dbContext.Runes.find(query)
    // probably need to put in some logic here to return an array of account ids from the full list of runes
    return accounts
  }

  async getRuneById(runeId) {
    const rune = await dbContext.Runes.findById(runeId)
    if (!rune) {
      throw new BadRequest("Could not find a rune by that ID.")
    }
    return rune
  }

  async getRuneByName(runeName) {
    const rune = await dbContext.Runes.find({ name: runeName })
    if (!rune) {
      throw new BadRequest("Could not find a rune by the name: " + runeName)
    }
    return rune
  }

  async getMyRuneById(runeId) {
    const myRune = await dbContext.MyRunes.findById(runeId)
    if (!myRune) {
      throw new BadRequest("Could not find a rune of yours by that ID.")
    }
    return myRune
  }

  async addRune(runeData) {
    const rune = await dbContext.Runes.create(runeData)
    return rune
  }

  async addToMyRunes(runeData, accountId) {
    runeData.accountId = accountId
    const myRune = await dbContext.MyRunes.create(runeData)
    return myRune
  }

  async editMyRune(runeData, accountId) {
    const myRune = await dbContext.MyRunes.find(runeData.id)
    // @ts-ignore
    if (myRune.accountId.toString() !== accountId) {
      throw new Forbidden("This is not your rune.")
    }

    // @ts-ignore
    myRune.quantity = runeData.quantity || myRune.quantity

    return myRune
  }

  async deleteRune(runeId) {
    const rune = await this.getRuneById(runeId)
    await rune.remove()
    return rune
  }

  async deleteMyRune(runeId, accountId) {
    const myRune = await this.getMyRuneById(runeId)

    // @ts-ignore
    if (myRune.accountId.toString() !== accountId) {
      throw new Forbidden("This is not your rune.")
    }

    await myRune.remove()
    return myRune
  }

  async deleteMyRunes(accountId) {
    // some logic to delete all myRunes associated with the account
  }
}

export const runesService = new RunesService()