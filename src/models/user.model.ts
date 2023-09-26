import mongoose, { Document, Schema } from "mongoose";
import { IRole } from "./role.model";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: IRole["_id"];
  tokens: string[];
}
export const userSchema: Schema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  tokens: [{ type: String }],
});

export const User = mongoose.model<IUser>("User", userSchema);
