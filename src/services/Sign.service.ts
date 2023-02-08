import UserModel, { I_User } from "../models/User.model";
import { hashPassword, verifyPassword } from "../middleware/bcrypt";
import { SignToken } from "../types";
import { createJWTToken } from "../middleware/auth";

export const signUpService = async (
  nameReceived: string,
  emailReceived: string,
  password: string
): Promise<I_User> => {
  const hashedPassword = await hashPassword(password);
  const newUser = await new UserModel({
    userName: nameReceived,
    email: emailReceived,
    password: hashedPassword,
  }).save();

  if (!newUser) throw new Error("User couldn't be created");

  return newUser;
};

export const signInService = async (
  signName: string,
  signinPassword: string
): Promise<SignToken> => {
  const userSignIn = await UserModel.findOne({ name: signName });
  if (!userSignIn) throw new Error("User is not found");

  const { id, userName, password } = userSignIn;

  const isMatch = await verifyPassword(signinPassword, password);
  if (!isMatch) throw new Error("Password incorrect.");

  const token = await createJWTToken(id, userName);

  return { id, userName, token };
};

export const userExistsByIdService = async (id: number): Promise<I_User> => {
  const admin = await UserModel.findOne({ id: id });

  if (!admin) throw new Error(`User is not found`);

  return admin;
};
