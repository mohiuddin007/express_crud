import { IOrders, IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists!");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};

const getAUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.find({ userId }, { password: 0 });
    return result;
  } else {
    throw new Error("User doesn't exist!");
  }
};

const updateUserIntoDb = async (userId: number, userData: IUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId }, userData);
    return result;
  } else {
    throw new Error("User doesn't exist!");
  }
};

const deleteAUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error("User doesn't exist!");
  }
};

const addNewProductIntoDb = async (userId: number, orderData: IOrders) => {
  const result = await User.updateOne(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    }
  );
  return result;
};

const getAllProductFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.find({ userId }, { _id: 0, orders: 1 });
    return result;
  } else {
    throw new Error("User doesn't exist!");
  }
};

const getAllProductPriceFromDb = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: "$orders" },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    { $project: { totalPrice: 1, _id: 0 } },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDB,
  getAUserFromDB,
  updateUserIntoDb,
  deleteAUserFromDB,
  addNewProductIntoDb,
  getAllProductFromDb,
  getAllProductPriceFromDb,
};
