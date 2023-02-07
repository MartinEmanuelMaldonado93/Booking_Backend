import { NextFunction, Request, Response } from "express";

export type callbackController = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type CustomCookies = string | null | undefined;
