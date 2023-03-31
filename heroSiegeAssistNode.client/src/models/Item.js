import { formatter } from "../utils/Formatter";

export class Item {
  constructor(data) {
    this.id = data.id || data._id;
    this.name = formatter.toTitleCase(data.name) || data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.itemSlot = data.itemSlot;
    this.itemType = data.itemType;
  }
}