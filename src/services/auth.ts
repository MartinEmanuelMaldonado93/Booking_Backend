import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKEN_KEY } from "./constants";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token = req.header("Authorization");
    const token = req.cookies[TOKEN_KEY] as string | null | undefined;
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT!);
    // (req as CustomRequest).cookies = decoded; // ??

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
