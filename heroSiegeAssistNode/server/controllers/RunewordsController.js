import BaseController from "../utils/BaseController";

export class RunewordsController extends BaseController {
  constructor() {
    super("api/runewords")
    this.router
      .get("", this.getRunewords)
  }

  async getRunewords(req, res, next) {
    try {
      return res.send("Here are my runewords!")
    }
    catch(error) {
      next(error)
    }
  }
}