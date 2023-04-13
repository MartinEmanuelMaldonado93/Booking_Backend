import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface RequestWithToken extends Request {
  token: string | JwtPayload;
}

export async function createJWTToken(
  adminID: number,
  adminName: string
): Promise<string> {
  if (!process.env.JWT) return "";

  const token = jwt.sign(
    { id: String(adminID), userName: adminName },
    process.env.JWT,
    {
      expiresIn: "2 days",
    }
  );

  return token;
}

/** Will check the token in the header of request, then after verify if its valid
 * add token to req and give access  otherwise return 401
 */
export async function authJWT(req: Request, res: Response, next: NextFunction) {
  if (!process.env.JWT) throw new Error("JWT variable empty.");

  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) throw new Error("No token available");

    const decoded = jwt.verify(token, process.env.JWT);
    (req as RequestWithToken).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
}
