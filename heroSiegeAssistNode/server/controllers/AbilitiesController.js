import { abilitesService } from "../services/AbilitiesService";
import BaseController from "../utils/BaseController";

export class AbilitiesController extends BaseController {
  constructor() {
    super("api/abilities")
    this.router
      .get("", this.getAbilities)
      .post("", this.addAbility)
      .put("/:abilityId", this.editAbility)
      .delete("/:abilityId", this.deleteAbility)
  }

  async getAbilities(req, res, next) {
    try {
      const abilities = await abilitesService.getAbilities()
      res.send(abilities)
    }
    catch(error) {
      next(error)
    }
  }

  async addAbility(req, res, next) {
    try {
      const ability = await abilitesService.addAbility(req.body)
      res.send(ability)
    }
    catch(error) {
      next(error)
    }
  }

  async editAbility(req, res, next) {
    try {
      const ability = await abilitesService.editAbility(req.params.abilityId, req.body)
      res.send(ability)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteAbility(req, res, next) {
    try {
      const ability = await abilitesService.deleteAbility(req.params.abilityId)
      res.send(ability)
    }
    catch(error) {
      next(error)
    }
  }
}