import { Router } from "express";
import { authMiddleware } from "../auth/auth_middleware.js";
import { addItem, getUserCart } from "./cart_controller.js";

const router = Router();

router.post("/", authMiddleware, addItem);
router.get("/", authMiddleware, getUserCart);

export default router;
