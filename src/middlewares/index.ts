import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkAllSignUpReq,
  checkPassword,
} from "./verifySignUp";
import { verifyToken, isAdmin } from "./authjwt";
import { checkAllSignInReq } from "./verifySignIn";

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkAllSignUpReq,
  checkPassword,
};

export const authJwt = {
  verifyToken,
  isAdmin,
};

export const verifySignIn = {
  checkAllSignInReq,
};
