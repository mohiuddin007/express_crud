"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
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
//custom static method
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
//middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
exports.User = (0, mongoose_1.model)("user", userSchema);
