import { SECRET } from "../config/auth.config";
import { db } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { IRole } from "../models/role.model";

const User = db.user;
const Role = db.role;

export const signup = async (req: Request, res: Response) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      user.roles = [defaultRole?._id];
    }

    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (error: any) {
    console.error("Error while signup", error);

    res.status(500).send({
      message: error.message || "An error occurred while registering the user.",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v")
      .catch((err: any) => {
        return res.status(500).send({
          message: err || "An error occurred while finding the user!",
        });
      });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const username = user.get("username");
    const password = user.get("password");
    const email = user.get("email");
    const role = user.get("roles");
    const userId = user.get("id");
    const passwordIsValid = bcrypt.compareSync(req.body.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: userId }, SECRET, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 hours
    });

    const authorities = role.map(
      (role: IRole) => `ROLE_${role.name.toUpperCase()}`
    );

    // @ts-ignore
    req.session.token = token;

    res.status(200).send({
      id: userId,
      username: username,
      email: email,
      roles: authorities,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: `Error: ${error.message || "An error occurred in sign in."}`,
    });
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: err.message || "Error in Signin out1" });
  }
};
