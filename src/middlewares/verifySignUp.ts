import { User, db } from "../models";
import { Request, Response } from "express";
import { validatePassword } from "../constants";

const ROLES = db.allRoles;

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "An error occurred while checking duplicates.",
    });
  }
};

export const checkRolesExisted = (
  req: Request,
  res: Response,
  next: Function
) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

export const checkAllSignUpReq = (
  req: Request,
  res: Response,
  next: Function
) => {
  const requiredFields = ["username", "email", "password"];
  const nullFields = [];

  for (const field of requiredFields) {
    if (req.body[field] == null) {
      nullFields.push(field);
    }
  }

  if (nullFields.length > 0) {
    const message = `Send all the required fields: ${nullFields.join(", ")}.`;
    return res.status(400).send({ message });
  } else {
    next();
  }
};

export const checkPassword = (req: Request, res: Response, next: Function) => {
  if (!validatePassword(req.body.password)) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.",
    });
  }
  next();
};
