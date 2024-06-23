import User from "../models/user.model";
import {Request , Response ,  NextFunction} from "express";
import { errorHandler } from "../utils/error";
import bcrypt from "bcrypt";
import { CustomError } from '../utils/error';
import dotenv from "dotenv";


const handleAuthorizeAction = (reqUserId: string , userId: string, next:NextFunction) => {
  if(reqUserId !== userId) {
    return next(errorHandler(401, "You are not authorized to perform this action"));
  }
}
interface RequestWithUserId extends Request { 
    user: {
        id: string;
    }
}



dotenv.config();

export const updateUser = async function (req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password, PIN } = req.body;
  const { userId } = req.params;
  const request = req as RequestWithUserId;
  handleAuthorizeAction(request.user.id, userId , next)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (password && !(await bcrypt.compare(password, user.password))) {
      return next(errorHandler(401, "Incorrect password"));
    }

    const updatedData: Partial<typeof user> = {};
    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    if (email) updatedData.email = email;
    if (PIN) updatedData.PIN = PIN;

    if (req.body.newPassword) {
      updatedData.password = await bcrypt.hash(req.body.newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    const error = err as CustomError;
    next(errorHandler(500, error.message));
  }
};

export const deleteUser = async function (req: Request, res: Response, next: NextFunction) { 
  const { userId } = req.params;
  const request = req as RequestWithUserId;
  handleAuthorizeAction(request.user.id, userId , next)


  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    await User.findByIdAndDelete(userId);
    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
      data: null
    });
  } catch(err) {
    const error = err as CustomError;
    next(errorHandler(500, error.message));
  }
}