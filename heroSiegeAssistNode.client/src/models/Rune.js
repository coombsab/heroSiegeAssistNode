import { formatter } from "../utils/Formatter";

export class Rune {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.effect = data.effect;
    this.tier = data.tier;
    this.dropRate = data.dropRate;
    this.img = data.img;
    this.possibleRunewords = data.possibleRunewords || [];
    this.possibleRunewords.forEach(runeword => {
      runeword.name = formatter.toTitleCase(runeword.name) || runeword.name;
    })
  }
}