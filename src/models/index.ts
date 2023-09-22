import mongoose from "mongoose";
import { Role } from "./role.model";
import { User } from "./user.model";

mongoose.Promise = globalThis.Promise;

export const db = {
  customMongoose: mongoose,
  user: User,
  role: Role,
  allRoles: ["user", "admin"],
};
