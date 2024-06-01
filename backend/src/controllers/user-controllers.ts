import { Request, Response, NextFunction } from "express";
import User from "../models/user-model.js";

// GET ALL USERS
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
