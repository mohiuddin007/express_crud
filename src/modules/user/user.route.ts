import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUser);
router.get("/:userId", UserController.getAUserByuserId);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteAUserByuserId);
router.put('/:userId/orders', UserController.addNewOrder);
router.get('/:userId/orders', UserController.getAllOrder);
router.get('/:userId/orders/total-price', UserController.calculateTotalPrice)

export const UserRoutes = router;
