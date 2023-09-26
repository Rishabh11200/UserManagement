import { Request, Response } from "express";

export const checkAllSignOutReq = (
  req: Request,
  res: Response,
  next: Function
) => {
  const requiredFields = ["refreshToken"];
  const nullFields = [];

  for (const field of requiredFields) {
    if (req.body[field] == null) {
      nullFields.push(field);
    }
  }

  if (nullFields.length > 0) {
    const message = `Send the token.`;
    return res.status(400).send({ message });
  } else {
    next();
  }
};
