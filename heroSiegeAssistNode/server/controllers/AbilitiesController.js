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
      res.send("Getting abilities!")
    }
    catch(error) {
      next(error)
    }
  }

  async addAbility(req, res, next) {
    try {
      res.send("Adding an ability!")
    }
    catch(error) {
      next(error)
    }
  }

  async editAbility(req, res, next) {
    try {
      res.send("Editing an ability!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteAbility(req, res, next) {
    try {
      res.send("Deleting an ability!")
    }
    catch(error) {
      next(error)
    }
  }
}