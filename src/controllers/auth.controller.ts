import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import bcrypt from "bcrypt";
import { CustomError } from '../utils/error';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
    const {firstName , lastName , email , password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return next(errorHandler(400, "Email already in use"));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password:  hashedPassword,
        createdAt: Date.now().toString(),
    });
      await newUser.save();
      
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        token,
        data: {
          user: newUser
        }
      });
    } catch (err) {
      const error = err as CustomError;
      next(errorHandler(500, error.message));
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

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        token,
        data: {
          user
        }
      });
    } catch (err) {
      const error = err as CustomError;
      next(errorHandler(500, error.message));
    }
}
