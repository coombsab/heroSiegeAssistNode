import mongoose from 'mongoose'
import { AbilitySchema } from "../models/Ability";
import { AccountSchema } from '../models/Account'
import { AccountsSchema } from "../models/Accounts";
import { EffectTextSchema } from "../models/EffectText";
import { ItemSchema } from "../models/Item";
import { MyRuneSchema } from "../models/MyRune";
import { RuneSchema } from "../models/Rune";
import { RuneRunewordSchema } from "../models/RuneRuneword";
import { RunewordSchema } from "../models/Runeword";
import { RunewordAbilitySchema } from "../models/RunewordAbility";
import { RunewordEffectSchema } from "../models/RunewordEffect";
import { RunewordItemSchema } from "../models/RunewordItem";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Abilities = mongoose.model("Ability", AbilitySchema);
  Accounts = mongoose.model("Accounts", AccountsSchema);
  EffectsText = mongoose.model("EffectText", EffectTextSchema)
  Items = mongoose.model("Items", ItemSchema)
  MyRunes = mongoose.model("MyRune", MyRuneSchema)
  Runes = mongoose.model("Rune", RuneSchema)
  RuneRunewords = mongoose.model("RuneRuneword", RuneRunewordSchema)
  Runewords = mongoose.model("Runeword", RunewordSchema)
  RunewordAbilities = mongoose.model("RunewordAbility", RunewordAbilitySchema)
  RunewordEffects = mongoose.model("RunewordEffect", RunewordEffectSchema)
  RunewordItems = mongoose.model("RunewordItem", RunewordItemSchema)
}

export const dbContext = new DbContext()
