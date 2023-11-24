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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: {
        code: 500,
        description: err.message || "Something went wrong!"
      }
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message || "Something went wrong!"
      }
    });
  }
};

const getAUserByuserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getAUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: {
        code: 500,
        description: err.message || "Something went wrong!"
      }
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const userId = req.params.userId;
      const zodParsedData = userZodValidation.parse(userData);
      const result = await UserServices.updateUserIntoDb(Number(userId), zodParsedData);
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: 500,
          description: err.message || "Something went wrong!"
        }
      });
    }
  };

const deleteAUserByuserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await UserServices.deleteAUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: {
        code: 500,
        description: err.message || "Something went wrong!"
      }
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const userId = req.params.userId;
      await UserServices.addNewProductIntoDb(Number(userId), orderData);
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: 500,
          description: err.message || "Something went wrong!"
        }
      });
    }
  };

  const getAllOrder = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const result = await UserServices.getAllProductFromDb(Number(userId));
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: 500,
          description: err.message || "Something went wrong!"
        }
      });
    }
  };

  const calculateTotalPrice = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const result = await UserServices.getAllProductPriceFromDb(Number(userId));
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: result
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: 500,
          description: err.message || "Something went wrong!"
        }
      });
    }
  };

export const UserController = {
  createUser,
  getAllUser,
  getAUserByuserId,
  updateUser,
  deleteAUserByuserId,
  addNewOrder,
  getAllOrder,
  calculateTotalPrice
};
