import * as dotenv from "dotenv";
dotenv.config();

export const SECRET = process.env.SECRET ?? "";
export const SESSIONKEY = process.env.SESSIONKEY ?? "";
