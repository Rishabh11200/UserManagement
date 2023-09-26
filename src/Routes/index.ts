import { Express } from "express";
import { authRoute } from "./auth.routes";
import { userRoute } from "./user.routes";

export const Routes = (app: Express) => {
  authRoute(app);
  userRoute(app);
};
