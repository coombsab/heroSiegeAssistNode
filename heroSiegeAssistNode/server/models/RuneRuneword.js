import mongoose from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const RuneRunewordSchema = new Schema (
  {
    runewordId: { type: OBJECT_ID, required: true },
    runeId: { type: OBJECT_ID, required: true },

  }, SCHEMA_OPTIONS
)

RuneRunewordSchema.virtual("rune", {
  localField: "runeId",
  foreignField: "_id",
  justOne: true,
  ref: "Rune"
})

RuneRunewordSchema.virtual("runeword", {
  localField: "runewordId",
  foreignField: "_id",
  justOne: true,
  ref: "Runeword"
})