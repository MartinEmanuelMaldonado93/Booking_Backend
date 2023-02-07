import bcrypt from "bcryptjs";
import { createError } from "../services/createError";
import jwt from "jsonwebtoken";
import { callbackController } from "../types";
import UserModel, { I_User } from "../models/User.model";
import { TOKEN_KEY } from "../services/constants";

// no cookies 
export const register = async ({ req, res, next }: callbackController) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const userReceived = req.body as I_User;

  try {
    const newUser = new UserModel({
      userName: userReceived.userName,
      email: userReceived.email,
      password: hash,
    });

    await newUser.save();

    res.status(201).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

/** Login use cookies once the user is registered */
export const login = async ({ req, res, next }: callbackController) => {
  const userReceived = req.body as I_User;
  try {
    const foundUser = await UserModel.findOne({
      userName: userReceived.userName,
    });

    if (!foundUser) {
      return next(createError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(
      userReceived.password,
      foundUser.password
    );

    if (!isMatch) {
      return next(createError(400, "Password incorrect. Try again!"));
    }

    const token = jwt.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      process.env.JWT!
    );

    const foundUserMongo: typeof foundUser | { _doc: any } = {
      ...foundUser,
      _doc: null,
    };

    const { password, isAdmin, ...otherDetails } = foundUserMongo._doc; // don't send private data

    res
      .cookie(TOKEN_KEY, token, {
        httpOnly: false,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
