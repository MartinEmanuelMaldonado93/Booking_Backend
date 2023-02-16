import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { I_User } from "../models/User.model";

export interface CustomRequest extends Request {
  token?: string | JwtPayload;
  user: I_User;
}
