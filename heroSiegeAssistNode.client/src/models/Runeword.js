import { formatter } from "../utils/Formatter";
import { Ability } from "./Ability";
import { Item } from "./Item";

export class Runeword {
  constructor(data) {
    this.id = data.id || data._id
    this.name = formatter.toTitleCase(data.name) || data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.itemSlot = data.itemSlot;
    this.itemType = data.itemType;
    this.runes = data.runes;
    this.effects = data.effects;
    this.items = data.items;
    this.abilities = data.abilities;
    if (this.abilities.length > 0) {
      this.abilities.forEach(ability => {
        ability = new Ability(ability)
      })
    }
    if (this.items.length > 0) {
      this.items.forEach(item => {
        item = new Item(item)
      })
    }
  }
}