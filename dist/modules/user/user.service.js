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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error("User already exists!");
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getAUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.find({ userId }, { password: 0 });
        return result;
    }
    else {
        throw new Error("User doesn't exist!");
    }
});
const updateUserIntoDb = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const updateResult = yield user_model_1.User.updateOne({ userId }, userData);
        if (updateResult.modifiedCount > 0) {
            const updatedUser = yield user_model_1.User.findOne({ userId }, { password: 0 });
            return updatedUser;
        }
        else {
            throw new Error("User data is the same, no update performed!");
        }
    }
    else {
        throw new Error("User doesn't exist!");
    }
});
const deleteAUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.deleteOne({ userId });
        return result;
    }
    else {
        throw new Error("User doesn't exist!");
    }
});
const addNewProductIntoDb = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, {
        $push: {
            orders: orderData,
        },
    });
    return result;
});
const getAllProductFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.find({ userId }, { _id: 0, orders: 1 });
        return result;
    }
    else {
        throw new Error("User doesn't exist!");
    }
});
const getAllProductPriceFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
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
    return result[0];
});
exports.UserServices = {
    createUserIntoDb,
    getAllUserFromDB,
    getAUserFromDB,
    updateUserIntoDb,
    deleteAUserFromDB,
    addNewProductIntoDb,
    getAllProductFromDb,
    getAllProductPriceFromDb,
};
