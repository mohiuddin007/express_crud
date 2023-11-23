"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const fullNameZodValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
});
const addressZodValidation = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
const orderZodValidation = zod_1.z.object({
    productName: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.userZodValidation = zod_1.z.object({
    userId: zod_1.z.number().positive(),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    fullName: fullNameZodValidation,
    age: zod_1.z.number().positive(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1)),
    address: addressZodValidation,
    orders: zod_1.z.array(orderZodValidation).optional(),
});
