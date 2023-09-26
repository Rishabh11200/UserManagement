import { Request, Response } from "express";

export const allAccess = (req: Request, res: Response) => {
  return res.status(200).send("Public Content.");
};

export const userBoard = (req: Request, res: Response) => {
  return res.status(200).send("User Content.");
};

export const adminBoard = (req: Request, res: Response) => {
  return res.status(200).send("Admin Content.");
};
