import { Router } from "express";
import { authMiddleware } from "../auth/auth_middleware.js";
import { payOrder } from "./payment_controller.js";

const router = Router();

router.post("/payment", authMiddleware, payOrder);

export default router;
