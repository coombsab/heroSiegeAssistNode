import { effectsService } from "../services/EffectsService";
import BaseController from "../utils/BaseController";

export class EffectsController extends BaseController {
  constructor() {
    super("api/effects")
    this.router
      .get("", this.getEffectsText)
      .post("", this.addEffectText)
      .put("/:effectId", this.editEffectText)
      .delete("/:effectId", this.deleteEffectText)
  }

  async getEffectsText(req, res, next) {
    try {
      const effects = await effectsService.getEffectsText()
      res.send(effects)
    }
    catch(error) {
      next(error)
    }
  }

  async addEffectText(req, res, next) {
    try {
      const effect = await effectsService.addEffectText(req.body)
      res.send(effect)
    }
    catch(error) {
      next(error)
    }
  }

  async editEffectText(req, res, next) {
    try {
      res.send("Editing an effect text!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteEffectText(req, res, next) {
    try {
      const effect = await effectsService.deleteEffectText(req.params.effectId)
      res.send(effect)
    }
    catch(error) {
      next(error)
    }
  }
}