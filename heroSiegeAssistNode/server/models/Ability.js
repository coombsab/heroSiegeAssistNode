import mongoose from "mongoose";
import { SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const AbilitySchema = new Schema (
  {
    name: { type: String, required: true },
    description: { type: String, required: true }
  }, SCHEMA_OPTIONS
)