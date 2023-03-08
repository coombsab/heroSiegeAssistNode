import { dbContext } from "../db/DbContext"

class EffectsService {
  async  getEffectsText(query = {}) {
    const effects = await dbContext.EffectsText.find(query)
    return effects
  }
}

export const effectsService = new EffectsService()