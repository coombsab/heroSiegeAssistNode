import mongoose from "mongoose";
import { SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const RuneSchema = new Schema (
  {
    name: { type: String, required: true, unique: true },
    effect: { type: String, required: true },
    tier: { type: String, required: true },
    dropRate: { type: String },
    img: { type: String, required: true },

    possibleRunewords: []
  }, SCHEMA_OPTIONS
)