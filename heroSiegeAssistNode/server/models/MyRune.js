import mongoose from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const MyRuneSchema = new Schema (
  {
    name: { type: String, required: true, unique: true },
    effect: { type: String, required: true },
    tier: { type: String, required: true },
    dropRate: { type: String },
    img: { type: String, required: true },
    quantity: { type: Number, required: true },

    accountId: { type: OBJECT_ID, required: true },
    possibleRunewords: []
  }, SCHEMA_OPTIONS
)

