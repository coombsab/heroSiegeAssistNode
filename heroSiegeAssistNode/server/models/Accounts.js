import mongoose from "mongoose";
import { SCHEMA_OPTIONS } from "../db/DbUtils";

const Schema = mongoose.Schema;

export const AccountsSchema = new Schema(
  {
    AccountIds: { type: Array }
  }, SCHEMA_OPTIONS

)