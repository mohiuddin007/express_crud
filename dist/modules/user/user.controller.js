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
exports.UserController = void 0;
const user_zod_validation_1 = require("./user.zod.validation");
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParsedData = user_zod_validation_1.userZodValidation.parse(userData);
        const result = yield user_service_1.UserServices.createUserIntoDb(zodParsedData);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
});
const getAUserByuserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.getAUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const userId = req.params.userId;
        const zodParsedData = user_zod_validation_1.userZodValidation.parse(userData);
        const result = yield user_service_1.UserServices.updateUserIntoDb(Number(userId), zodParsedData);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const deleteAUserByuserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield user_service_1.UserServices.deleteAUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const userId = req.params.userId;
        yield user_service_1.UserServices.addNewProductIntoDb(Number(userId), orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.getAllProductFromDb(Number(userId));
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.UserServices.getAllProductPriceFromDb(Number(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong!",
            error: err,
        });
    }
});
exports.UserController = {
    createUser,
    getAllUser,
    getAUserByuserId,
    updateUser,
    deleteAUserByuserId,
    addNewOrder,
    getAllOrder,
    calculateTotalPrice
};
