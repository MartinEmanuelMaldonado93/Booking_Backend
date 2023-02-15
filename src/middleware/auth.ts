import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
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

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.JWT) throw new Error("JWT variable empty.");
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) throw new Error("No token authorized");

    const decoded = jwt.verify(token, process.env.JWT);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
