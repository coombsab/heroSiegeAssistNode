import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class AbilitiesService {
  async getAbilities(query = {}) {
    const abilities = dbContext.Abilities.find(query)
    return abilities
  }

  async getAbilityById(abilityId) {
    const ability = dbContext.Abilities.findById(abilityId)
    if (!ability) {
      throw new BadRequest("Could not find an ability by that ID.")
    }
    return ability
  }

  async addAbility(abilityData) {
    const ability = dbContext.Abilities.create(abilityData)
    return ability
  }

  async editAbility(abilityId, abilityData) {
    const ability = await this.getAbilityById(abilityId)

    //*REVIEW - Same problem as for deleteAbility
    if (!ability) {
      throw new BadRequest("Could not find an ability by that ID.")
    }

    ability.name = abilityData.name || ability.name
    ability.description = abilityData.description || ability.description

    await ability.save()
    return ability
  }

  async deleteAbility(abilityId) {
    const ability = await this.getAbilityById(abilityId)
    //*REVIEW - Why does this one think it could be null?  have to copy the check here instead of using it through getAbilityId
    if (!ability) {
      throw new BadRequest("Could not find an ability by that ID.")
    }

    await ability.remove()
    return ability
  }
}

export const abilitesService = new AbilitiesService()