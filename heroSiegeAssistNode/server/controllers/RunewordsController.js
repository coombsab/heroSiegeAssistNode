import BaseController from "../utils/BaseController";

export class RunewordsController extends BaseController {
  constructor() {
    super("api/runewords")
    this.router
      .get("", this.getRunewords)
      .post("", this.addRuneword)
      .put("/:runewordId", this.editRuneword)
      .delete("/:runewordId", this.deleteRuneword)
  }

  async getRunewords(req, res, next) {
    try {
      return res.send("Here are my runewords!")
    }
    catch(error) {
      next(error)
    }
  }

  async addRuneword(req, res, next) {
    try {
      return res.send("Added a runeword!")
    }
    catch(error) {
      next(error)
    }
  }
  async editRuneword(req, res, next) {
    try {
      return res.send("Edited the runeword!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteRuneword(req, res, next) {
    try {
      return res.send("Deleted the runeword!")
    }
    catch(error) {
      next(error)
    }
  }
}
