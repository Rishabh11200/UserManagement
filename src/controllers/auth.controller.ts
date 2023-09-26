import { ACCESSSECRET, REFRESHSECRET } from "../config/auth.config";
import { User } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import moment from "moment";
import { Role } from "../models/role.model";

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
    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const username = user.username;
    const password = user.password;
    const email = user.email;
    const role = user.roles;
    const userId = user.id;
    const passwordIsValid = bcrypt.compareSync(req.body.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const refreshToken = jwt.sign({ id: userId }, REFRESHSECRET, {
      algorithm: "HS256",
      expiresIn: "5m",
    });
    const accessToken = jwt.sign({ id: userId }, ACCESSSECRET, {
      algorithm: "HS256",
      expiresIn: "1m",
    });

    user.tokens.push(refreshToken);

    await user.save();

    res.status(200).send({
      refreshToken: refreshToken,
      accessTokenExpiresIn: moment().add(1, "m").toLocaleString(),
      accessToken: accessToken,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: `Error: ${error.message || "An error occurred in sign in."}`,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const oldRefreshToken: string | undefined = req.body.refreshToken;

    if (!oldRefreshToken) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(oldRefreshToken, REFRESHSECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send(err);
      }

      const accessToken = jwt.sign({ id: (decoded as any).id }, ACCESSSECRET, {
        algorithm: "HS256",
        expiresIn: "1m",
      });

      res.status(200).send({
        accessTokenExpiresIn: moment().add(1, "m").toLocaleString(),
        accessToken: accessToken,
      });
    });
  } catch (error: any) {
    return res.status(500).send({
      message: `Error: ${
        error.message || "An error occurred in refresh token."
      }`,
    });
  }
};

export const signout = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  try {
    const user = await User.findById((req.params as any).userId);

    if (!user)
      return res.status(404).send({
        message: `User not found!`,
      });

    user.tokens = user.tokens.filter((token) => token !== refreshToken);
    await user.save();

    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: err.message || "Error in Signin out!" });
  }
};
