import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ACCESS_TOKEN } from "../helpers/constants";

let SECRET_KEY = process.env.JWT || "";

export interface CustomRequest extends Request {
  adminToken: string | JwtPayload;
}

export const createJWTToken = async (
  adminId: number,
  adminName: string
): Promise<string> => {
  if (!process.env.JWT) return "";

  const token = jwt.sign(
    { id: adminId.toString(), userName: adminName },
    process.env.JWT,
    {
      expiresIn: "2 days",
    }
  );

  return token;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) throw new Error("No authorized");

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).adminToken = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
