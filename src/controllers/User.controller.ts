import { RequestHandler } from "express";
import User from "../models/User.model";

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("user is not found");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
