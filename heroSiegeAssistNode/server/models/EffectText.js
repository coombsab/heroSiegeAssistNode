import mongoose from "mongoose";
import { SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const EffectTextSchema = new Schema(
  {
    name: { type: String, unique: true }
  }, SCHEMA_OPTIONS
)