import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/runes", this.getMyRunes)
      .post("/runes", this.addToMyRunes)
      .put("/runes/:runeId", this.editMyRune)
      .delete("/runes/:runeId", this.deleteMyRune)
      .delete("/runes", this.deleteMyRunes)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyRunes(req, res, next) {
    try {
      res.send("Getting my runes!")
    }
    catch(error) {
      next(error)
    }
  }

  async addToMyRunes(req, res, next) {
    try {
      res.send("Adding another rune to my list!")
    }
    catch(error) {
      next(error)
    }
  }

  async editMyRune(req, res, next) {
    try {
      res.send("Editing one of my runes!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteMyRune(req, res, next) {
    try {
      res.send("Deleting one of my runes!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteMyRunes(req, res, next) {
    try {
      res.send("Deleting all of my runes!!!")
    }
    catch(error) {
      next(error)
    }
  }
}
