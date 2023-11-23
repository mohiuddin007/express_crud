"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userFullNameSchema = new mongoose_1.Schema({
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
const userAddressSchema = new mongoose_1.Schema({
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
const userOrderSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
exports.User = (0, mongoose_1.model)("user", userSchema);
