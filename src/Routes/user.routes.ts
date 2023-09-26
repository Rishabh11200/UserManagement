import { Express, Request, Response } from "express";
import { adminBoard, allAccess, userBoard } from "../controllers";
import { isAdmin, verifyToken } from "../middlewares/authjwt";

export const userRoute = (app: Express) => {
  app.use(function (req: Request, res: Response, next: Function) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [verifyToken], userBoard);

  app.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);
};
