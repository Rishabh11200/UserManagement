import mongoose from "mongoose";
mongoose.Promise = globalThis.Promise;
export const db = {
  customMongoose: mongoose,
  allRoles: ["user", "admin"],
};

export * from "./user.model";
export * from "./role.model";
