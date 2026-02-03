import { Router } from "express";
import { authMiddleware } from "../auth/auth_middleware.js";
import { checkOutOrder } from "./order_controller.js";

const router = Router();

router.post("/checkout", authMiddleware, checkOutOrder);

export default router;
