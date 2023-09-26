import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkAllSignUpReq,
  checkPassword,
} from "./verifySignUp";
import { verifyToken, isAdmin } from "./authjwt";
import { checkAllSignInReq } from "./verifySignIn";
import { checkAllSignOutReq } from "./verifySignOut";

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

export const verifySignOut = {
  checkAllSignOutReq,
};
