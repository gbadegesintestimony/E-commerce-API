import { Router } from "express";
import authRoutes from "../modules/auth/auth_routes.js";
import productRoutes from "../modules/product/product_routes.js";
import categoryRoutes from "../modules/category/category_routes.js";
import cartRoutes from "../modules/cart/cart_routes.js";
import orderRoutes from "../modules/order/order_routes.js";
import paymentRoutes from "../modules/payment/payment_routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
export default router;
