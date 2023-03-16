import { runewordsService } from "../services/RunewordsService";
import BaseController from "../utils/BaseController";

export class RunewordsController extends BaseController {
  constructor() {
    super("api/runewords")
    this.router
      .get("", this.getRunewords)
      .post("", this.addRuneword)
      .put("/:runewordId", this.editRuneword)
      .delete("/:runewordId", this.deleteRuneword)
      .post("/runes", this.addRuneToRuneword)
      .post("/abilities", this.addAbilityToRuneword)
      .post("/effects", this.addEffectToRuneword)
      .post("/items", this.addItemToRuneword)
  }

  async getRunewords(req, res, next) {
    try {
      const runewords = await runewordsService.getRunewords()
      return res.send(runewords)
    }
    catch(error) {
      next(error)
    }
  }

  async addRuneword(req, res, next) {
    try {
      const runeword = await runewordsService.addRuneword(req.body)
      return res.send(runeword)
    }
    catch(error) {
      next(error)
    }
  }
  async editRuneword(req, res, next) {
    try {
      const runeword = await runewordsService.editRuneword(req.body, req.params.runewordId)
      return res.send(runeword)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteRuneword(req, res, next) {
    try {
      const runeword = await runewordsService.deleteRuneword(req.params.runewordId)
      return res.send(runeword)
    }
    catch(error) {
      next(error)
    }
  }

  async addRuneToRuneword(req, res, next) {
    try {
      return res.send("Added rune to runeword!")
    }
    catch(error) {
      next(error)
    }
  }

  async addAbilityToRuneword(req, res, next) {
    try {
      return res.send("Added ability to runeword!")
    }
    catch(error) {
      next(error)
    }
  }

  async addEffectToRuneword(req, res, next) {
    try {
      return res.send("Added effect to runeword!")
    }
    catch(error) {
      next(error)
    }
  }

  async addItemToRuneword(req, res, next) {
    try {
      return res.send("Added item to runeword!")
    }
    catch(error) {
      next(error)
    }
  }
}
