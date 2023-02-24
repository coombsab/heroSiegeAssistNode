import mongoose from "mongoose"
import { SCHEMA_OPTIONS } from "../db/DbUtils"
const Schema = mongoose.Schema

export const RunewordSchema = new Schema(
  {
    name: { type: String, required: true },
    itemSlot: { type: String, required: true },
    itemType: { type: String, required: true }
  }, SCHEMA_OPTIONS
)