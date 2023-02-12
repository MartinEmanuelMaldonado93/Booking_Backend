import { Request, Response } from "express";
import { signInService, signUpService } from "../services/Login.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;

  try {
    const newUser = await signUpService(userName, password);
    res.status(200).send(newUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;
  try {
    const user = await signInService(userName, password);
    // res.cookie("token", admin.token, {
    //   secure: true,
    //   maxAge: 120000,
    //   httpOnly: false,
    // });
    // res.status(200).send({ id: admin.id, name: admin.name });
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
