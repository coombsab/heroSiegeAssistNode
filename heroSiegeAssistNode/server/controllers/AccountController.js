import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { runesService } from "../services/RunesService"
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
      const runes = await runesService.getMyRunes(req.userInfo.id)
      res.send(runes)
    }
    catch(error) {
      next(error)
    }
  }

  async addToMyRunes(req, res, next) {
    try {
      const rune = await runesService.addToMyRunes(req.body, req.userInfo.id)
      res.send(rune)
    }
    catch(error) {
      next(error)
    }
  }

  async editMyRune(req, res, next) {
    try {
      let runeData = req.body
      runeData.id = req.params.runeId
      const rune = await runesService.editMyRune(runeData, req.userInfo.id)
      res.send(rune)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteMyRune(req, res, next) {
    try {
      const rune = await runesService.deleteMyRune(req.params.runeId, req.userInfo.id)
      res.send(rune)
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
