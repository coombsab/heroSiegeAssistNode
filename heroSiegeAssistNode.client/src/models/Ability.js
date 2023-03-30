import { formatter } from "../utils/Formatter";

export class Ability {
  constructor(data) {
    this.id = data.id || data._id
    this.name = formatter.toTitleCase(data.name) || data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.description = formatter.capitalizeFirstLetter(data.description) || data.description;
  }
}