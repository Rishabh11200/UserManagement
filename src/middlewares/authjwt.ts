import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESSSECRET, REFRESHSECRET } from "../config";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  let accessToken: string | undefined =
    req.headers["authorization"]?.split(" ")[1];
  if (!accessToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(accessToken, ACCESSSECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }

    req.params.userId = (decoded as any).id;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: Function) => {
  try {
    const admin = await User.findById(req.params.userId);

    if (!admin) {
      return res.status(500).send({ message: "No user found!" });
    }

    const allRoles = await Role.find({ _id: { $in: admin.roles } });

    if (!allRoles.some((role) => role.name === "admin")) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }

    next();
  } catch (error: any) {
    if (error.message.includes("No user")) {
      console.error("Error in User.findById:", error);
    } else if (error.message.includes("Require")) {
      console.error("Error in Role.find:", error);
    }

    return res.status(500).send({
      message: `Error: ${
        error.message || "An error occurred in finding admin."
      }`,
    });
  }
};
