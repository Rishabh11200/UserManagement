import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  console.log("token", req);
  let token: string = req.session?.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.params.userId = (decoded as any).id;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: Function) => {
  try {
    const admin = await User.findById(req.body.userId);

    if (!admin) {
      return res
        .status(500)
        .send({ message: "User findById: No user / admin found!" });
    }

    const allRoles = await Role.find({ _id: { $in: admin.roles } });

    if (!allRoles.some((role) => role.name === "admin")) {
      return res
        .status(403)
        .send({ message: "Role find: Require Admin Role!" });
    }

    next();
  } catch (error: any) {
    if (error.message.includes("User.findById")) {
      console.error("Error in User.findById:", error);
    } else if (error.message.includes("Role.find")) {
      console.error("Error in Role.find:", error);
    }

    return res
      .status(500)
      .send({
        message: `Error: ${
          error.message || "An error occurred in finding admin."
        }`,
      });
  }
};
