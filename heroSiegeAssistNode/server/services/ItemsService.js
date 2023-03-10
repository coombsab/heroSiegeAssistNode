import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ItemsService {
  async getItems(query = {}) {
    const items = await dbContext.Items.find(query)
    return items
  }

  async getItemById(itemId) {
    const item = await dbContext.Items.findById(itemId)
    if (!item) {
      throw new BadRequest("Could not find an item by that ID.")
    }
    return item
  }

  async addItem(itemData) {
    const item = await dbContext.Items.create(itemData)
    return item
  }

  async editItem(itemId, itemData) {
    const item = await this.getItemById(itemId)
    item.name = itemData.name || item.name
    item.itemSlot = itemData.itemSlot || item.itemSlot
    item.itemType = itemData.itemType || item.itemType
    await item.save()
    return item
  }

  async deleteItem(itemId) {
    const item = await this.getItemById(itemId)
    await item.remove()
    return item
  }
}

export const itemsService = new ItemsService()