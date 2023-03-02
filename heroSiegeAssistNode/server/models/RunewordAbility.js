import mongoose from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const RunewordAbilitySchema = new Schema (
  {
    runewordId: { type: OBJECT_ID, required: true },
    abilityId: { type: OBJECT_ID, required: true }
  }, SCHEMA_OPTIONS
)