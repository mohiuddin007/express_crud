import { z } from "zod";

const fullNameZodValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const addressZodValidation = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderZodValidation = z.object({
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const userZodValidation = z.object({
  userId: z.number().positive(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: fullNameZodValidation,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressZodValidation,
  orders: z.array(orderZodValidation),
});
