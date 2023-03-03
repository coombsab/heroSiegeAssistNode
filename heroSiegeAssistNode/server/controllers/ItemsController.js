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
      res.send("Getting items!")
    }
    catch(error) {
      next(error)
    }
  }

  async addItem(req, res, next) {
    try {
      res.send("Adding an item!")
    }
    catch(error) {
      next(error)
    }
  }
  
  async editItem(req, res, next) {
    try {
      res.send("Editing an item!")
    }
    catch(error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      res.send("Deleting an item!")
    }
    catch(error) {
      next(error)
    }
  }
}