import { Request, Response } from "express";
import { userZodValidation } from "./user.zod.validation";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userZodValidation.parse(userData);
    const result = await UserServices.createUserIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};


export const UserController = {
    createUser,
}