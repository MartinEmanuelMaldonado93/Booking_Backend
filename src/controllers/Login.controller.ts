import { Request, Response } from "express";
import { signInService, signUpService } from "../services/Login.service";
import { getErrorMessage } from "../helpers/createError";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;

  try {
    const newUser = await signUpService(userName, password);
    res.status(200).send(newUser);
  } catch (error: any) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;
  try {
    const user = await signInService(userName, password);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(getErrorMessage(error));
  }
};
