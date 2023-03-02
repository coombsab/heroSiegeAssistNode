import mongoose from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const RunewordItemSchema = new Schema (
  {
    itemId: { type: OBJECT_ID, required: true },
    runewordId: { type: OBJECT_ID, required: true }
  }, SCHEMA_OPTIONS
)