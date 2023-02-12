import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { I_User } from "../models/User.model";
import { callbackController } from "../types";

export interface CustomRequest extends Request {
  token?: string | JwtPayload;
  user: I_User;
}
//verify if token exist, then verify through jwt.verify with token and secret key, then send req.user = user, next()
export const verifyUser = ({ req, res, next }: callbackController) => {};

export const verifyAdmin = ({ req, res, next }: callbackController) => {};
