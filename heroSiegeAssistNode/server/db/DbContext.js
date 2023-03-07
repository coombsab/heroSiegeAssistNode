import mongoose from 'mongoose'
import { AbilitySchema } from "../models/Ability";
import { AccountSchema } from '../models/Account'
import { AccountsSchema } from "../models/Accounts";
import { EffectTextSchema } from "../models/EffectText";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Abilities = mongoose.model("Ability", AbilitySchema);
  Accounts = mongoose.model("Accounts", AccountsSchema);
  EffectsText = mongoose.model("EffectText", EffectTextSchema)
}

export const dbContext = new DbContext()
