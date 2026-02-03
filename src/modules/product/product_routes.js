import { Router } from "express";
import * as controller from "./product_controller.js";
import { validate } from "../../middlewares/validate_middleware.js";
import { createProductSchema, updateProductSchema } from "./product_schema.js";
import { authMiddleware, adminOnly } from "../auth/auth_middleware.js";

const router = Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);

// Admin Roles
router.post(
  "/",
  authMiddleware,
  adminOnly,
  validate(createProductSchema),
  controller.createProduct,
);
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  validate(updateProductSchema),
  controller.updateProduct,
);
router.delete("/:id", authMiddleware, adminOnly, controller.deleteProduct);

export default router;
