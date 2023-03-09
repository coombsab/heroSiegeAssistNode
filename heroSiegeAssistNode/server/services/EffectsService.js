import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class EffectsService {
  async  getEffectsText(query = {}) {
    const effects = await dbContext.EffectsText.find(query)
    return effects
  }

  async getEffectTextById(effectId) {
    const effect = await dbContext.EffectsText.findById(effectId)
    if (!effect) {
      throw new BadRequest("Cannot find effect text by that ID.")
    }
    return effect
  }

  async addEffectText(effectData) {
    const effect = await dbContext.EffectsText.create(effectData)
    return effect
  }

  async deleteEffectText(effectId) {
    const effect = await this.getEffectTextById(effectId)
    await effect.remove()
    return effect
  }
}

export const effectsService = new EffectsService()