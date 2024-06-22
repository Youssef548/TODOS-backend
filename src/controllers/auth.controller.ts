import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import bcrypt from "bcrypt";

export const signUp = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
    const {firstname , lastname , email , password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return next(errorHandler(400, "Email already in use"));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password:  hashedPassword,
        createdAt: Date.now().toString(),
    });
      await newUser.save();
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: {
          user: newUser
        }
      });
    } catch (err) {
      next(errorHandler(500, err.message));
    }
};

export const signIn = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(errorHandler(400, "Invalid credentials"));
      }
      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: {
          user
        }
      });
    } catch (err) {
      next(errorHandler(500, err.message));
    }
}
