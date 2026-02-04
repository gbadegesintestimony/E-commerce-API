import { Router } from "express";
import * as controller from "./category_controller.js";
import { authMiddleware, adminOnly } from "../auth/auth_middleware.js";

const router = Router();

router.get("/", controller.getCategories);
router.post("/", authMiddleware, adminOnly, controller.createCategory);
router.put("/:id", authMiddleware, adminOnly, controller.updateCategory);
router.delete("/:id", authMiddleware, adminOnly, controller.deleteCategory);

export default router;
