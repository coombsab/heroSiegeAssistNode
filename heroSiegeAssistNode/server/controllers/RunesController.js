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
  }

  async getRunes(req, res, next) {
    try {
      res.send("Getting runes!")
    }
    catch(error) {
      next(error)
    }
  }

  async addRune(req, res, next) {
    try {
      res.send("Adding a rune!")
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
}