import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ACCESS_TOKEN } from "../services/constants";
import { login } from "../controllers/Sign.controller";

export interface CustomRequest extends Request {
  adminToken: string | JwtPayload;
}
export const createJWTToken = async (
  adminId: number,
  adminName: string
): Promise<string> => {
  const token = jwt.sign(
    { id: adminId.toString(), name: adminName },
    process.env.JWT || "",
    {
      expiresIn: "2 days",
    }
  );

  return token;
};
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    // const token = req.cookies[TOKEN_KEY] as string | null | undefined;// verify cookies in req
    if (!token) throw new Error("No authorized");

    const decoded = jwt.verify(token, process.env.JWT!);
    (req as CustomRequest).adminToken = decoded; //need to decode to work with information

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
