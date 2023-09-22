import { Express, Request, Response } from "express";
import { verifySignIn, verifySignUp } from "../middlewares";
import { signin, signout, signup } from "../controllers";

export const authRoute = (app: Express) => {
  app.use(function (req: Request, res: Response, next: Function) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkAllSignUpReq,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkPassword,
    ],
    signup
  );

  app.post("/api/auth/signin", [verifySignIn.checkAllSignInReq], signin);

  app.post("/api/auth/signout", signout);
};
