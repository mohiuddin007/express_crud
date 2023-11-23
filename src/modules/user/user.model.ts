import { Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrders,
  IUser,
  UserModel,
} from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userFullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
});

const userAddressSchema = new Schema<IAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
});

const userOrderSchema = new Schema<IOrders>({
  productName: {
    type: String,
    trim: true,
    required: [true, "Product Name is required"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, "Quantity is required"],
  },
});

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    trim: true,
    required: [true, "userId is required"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, "Full Name is required"],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, "age is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    trim: true,
    required: [true, "isActive is required"],
  },
  hobbies: [
    {
      type: String,
      trim: true,
      required: [true, "hobbies is required"],
    },
  ],
  address: {
    type: userAddressSchema,
    required: [true, "address is required"],
  },
  orders: [
    {
      type: userOrderSchema,
    },
  ],
});

//custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

//middleware
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});


export const User = model<IUser, UserModel>("user", userSchema);
