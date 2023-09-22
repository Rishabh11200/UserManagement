import { Request, Response } from "express";

export const checkAllSignInReq = (
  req: Request,
  res: Response,
  next: Function
) => {
  const requiredFields = ["username", "password"];
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
