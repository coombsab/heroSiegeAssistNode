import { Forbidden, BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"

class RunesService {
  async getRunes(query = {}) {
    const runes = await dbContext.Runes.find(query)
    await this.getPossibleRunewords(runes)

    return runes
  }

  async getMyRunes(accountId) {
    const myRunes = await dbContext.MyRunes.find({ accountId })
    await this.getPossibleRunewords(myRunes)
    return myRunes
  }

  async getPossibleRunewords(runes) {
    const runewords = await dbContext.Runewords.find()

    if (runes.constructor === Array) {
      runes.forEach(rune => {
        const possibleRunewords = new Set()
        runewords.forEach(runeword => {
          runeword.runes.forEach(r => {
            if (rune.name === r.name) {
              possibleRunewords.add(runeword)
            }
          })
        })
        rune.possibleRunewords = [...possibleRunewords]
      })
    } else {
      const possibleRunewords = new Set()
        runewords.forEach(runeword => {
          runeword.runes.forEach(r => {
            if (runes.name === r.name) {
              possibleRunewords.add(runeword)
            }
          })
        })
        runes.possibleRunewords = [...possibleRunewords]
    }

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
    await this.getPossibleRunewords(rune)
    return rune
  }

  async getRuneByName(runeName) {
    const rune = await dbContext.Runes.findOne({ name: runeName })
    if (!rune) {
      throw new BadRequest("Could not find a rune by the name: " + runeName)
    }
    await this.getPossibleRunewords(rune)
    return rune
  }

  async getMyRuneById(runeId) {
    const myRune = await dbContext.MyRunes.findById(runeId)
    if (!myRune) {
      throw new BadRequest("Could not find a rune of yours by that ID.")
    }
    await this.getPossibleRunewords(myRune)
    return myRune
  }

  async addRune(runeData) {
    const rune = await dbContext.Runes.create(runeData)
    await this.getPossibleRunewords(rune)
    return rune
  }

  async addToMyRunes(runeData, accountId) {
    runeData.accountId = accountId
    const rune = await this.getRuneByName(runeData.name)
    const alreadyOwnedRune = await dbContext.MyRunes.findOne({ name: rune.name, accountId: accountId })
    if (alreadyOwnedRune) {
      throw new BadRequest("You already have that rune added, please edit instead.")
    }
    runeData.effect = rune.effect
    runeData.tier = rune.tier
    runeData.dropRate = rune.dropRate
    runeData.img = rune.img
    const myRune = await dbContext.MyRunes.create(runeData)
    await this.getPossibleRunewords(myRune)
    return myRune
  }

  async editMyRune(runeData, accountId) {
    const myRune = await this.getMyRuneById(runeData.id)
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