import { Forbidden, BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class RunesService {
  async getRunes(query = {}) {
    const runes = await dbContext.Runes.find(query)
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

  async getRuneByName(query = {}) {
    const rune = await dbContext.Runes.findOne(query)
    return rune
  }

  async getMyRuneById(query = {}) {
    const myRune = await dbContext.MyRunes.findOne(query)
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