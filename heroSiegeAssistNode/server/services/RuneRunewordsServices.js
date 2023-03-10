import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class RuneRunewordsService {
  async addRunesToRuneword(runes, runewordId) {
    if(runes.constructor !== Array) {
      throw new BadRequest("Runes must be an array.")
    }

    // let query = {}

    //{$or: [{expires: {$gte: new Date()}}, {expires: null}]}
    //{$or: [{name: rune1}, {name: rune2}]}

    // runes.forEach(rune => {

    // })

    const allRunes = await dbContext.Runes.find()

    let tempRunes = []

    runes.forEach(rune => {
      allRunes.forEach(r => {
        if(rune.name === r.name) {
          tempRunes.push(r)
        }
      })
    })

  }
}

export const runeRunewordsService = new RuneRunewordsService()