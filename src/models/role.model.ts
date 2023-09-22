import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
}

export const roleSchema: Schema = new Schema({
  name: { type: String },
});

export const Role = mongoose.model<IRole>("Role", roleSchema);
