import { Router } from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  adminRegister,
} from "./auth_controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);

export default router;
