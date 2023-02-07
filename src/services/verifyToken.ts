import { NextFunction, Request, Response } from "express";
import { createError } from "./createError";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { I_User } from "../models/User.model";
import { CustomCookies, callbackController } from "../types";
import { TOKEN_KEY } from "./constants";

export interface CustomRequest extends Request {
  token?: string | JwtPayload;
  user: I_User;
}
// export interface CustomRequest extends Request {
//   token: string | JwtPayload;
// }

export const verifyToken = ({ req, res, next }: callbackController) => {
  console.log(req.cookies);
  const token = req.cookies[TOKEN_KEY] as CustomCookies;

  try {
    if (!token) {
      next(createError(401, "[token] You aren't authenticated."));
      return false;
      // throw new Error("[token] You aren't authenticated.");
    }

    // const decoded =
    jwt.verify(
      token,
      process.env.JWT!,
      (
        error: VerifyErrors | null,
        decoded: Jwt | JwtPayload | string | undefined
      ) => {
        console.log("error", error);
        console.log("decoded", decoded);
        // req.body = decoded;
      }
    );
    // (req as CustomRequest).token = decoded;
    return true;
  } catch {
    res.status(401).send("Please authenticate");
    return false;
  }
};

export const verifyUser = ({ req, res, next }: callbackController) => {
  if (verifyToken({ req, res, next })) {
    if (
      (req as CustomRequest).user.id === req.params.id ||
      (req as CustomRequest).user.isAdmin
    ) {
      next();
    } else {
      next(createError(403, "You aren't authorized."));
    }
  }
};

export const verifyAdmin = ({ req, res, next }: callbackController) => {
  if (!verifyToken({ req, res, next })) return;

  if ((req as CustomRequest).user.isAdmin) {
    next();
  } else {
    next(createError(403, "[verify admin] You aren't authorized."));
  }
};
