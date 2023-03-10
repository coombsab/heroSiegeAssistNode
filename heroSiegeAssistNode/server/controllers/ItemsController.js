import { itemsService } from "../services/ItemsService";
import BaseController from "../utils/BaseController";

export class ItemsController extends BaseController {
  constructor() {
    super("api/items")
    this.router
      .get("", this.getItems)
      .post("", this.addItem)
      .put("/:itemId", this.editItem)
      .delete("/:itemId", this.deleteItem)
  }

  async getItems(req, res, next) {
    try {
      const items = await itemsService.getItems()
      res.send(items)
    }
    catch(error) {
      next(error)
    }
  }

  async addItem(req, res, next) {
    try {
      const item = await itemsService.addItem(req.body)
      res.send(item)
    }
    catch(error) {
      next(error)
    }
  }
  
  async editItem(req, res, next) {
    try {
      const item = await itemsService.editItem(req.params.itemId, req.body)
      res.send(item)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      const item = await itemsService.deleteItem(req.params.itemId)
      res.send(item)
    }
    catch(error) {
      next(error)
    }
  }
}