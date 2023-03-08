import { runesService } from "../services/RunesService";
import BaseController from "../utils/BaseController";

export class RunesController extends BaseController {
  constructor() {
    super("api/runes")
    this.router
      .get("", this.getRunes)
      .post("", this.addRune)
      .get("/:accountId", this.getRunesByAccountId)
      .get("/accounts/list", this.getRunesForAccounts)
      .get("/accounts", this.getAccountsWithRunes)
      .delete("/:runeId", this.deleteRune)
  }

  async getRunes(req, res, next) {
    try {
      const runes = await runesService.getRunes()
      res.send(runes)
    }
    catch(error) {
      next(error)
    }
  }

  async addRune(req, res, next) {
    try {
      const rune = await runesService.addRune(req.body)
      res.send(rune)
    }
    catch(error) {
      next(error)
    }
  }

  async getRunesByAccountId(req, res, next) {
    try {
      res.send("Getting runes by account ID!")
    }
    catch(error) {
      next(error)
    }
  }

  async getRunesForAccounts(req, res, next) {
    try {
      res.send("Getting runes for specific accounts!")
    }
    catch(error) {
      next(error)
    }
  }

  async getAccountsWithRunes(req, res, next) {
    try {
      res.send("Getting a list of accounts with runes!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteRune(req, res, next) {
    try {
      const rune = await runesService.deleteRune(req.params.runeId)
      res.send(rune)  
    }
    catch(error) {
      next(error)
    }
  }
}