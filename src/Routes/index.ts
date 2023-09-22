import { Express } from "express";
import { authRoute } from "./auth.routes";

export const Routes = (app: Express) => {
  authRoute(app);
};
