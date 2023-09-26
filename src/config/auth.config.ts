import * as dotenv from "dotenv";
dotenv.config();

export const REFRESHSECRET = process.env.REFRESHSECRET ?? "";
export const ACCESSSECRET = process.env.ACCESSSECRET ?? "";
export const SESSIONKEY = process.env.SESSIONKEY ?? "";
