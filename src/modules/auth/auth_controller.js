import { success } from "zod";
import { registerSchema, loginSchema } from "./auth_schema.js";
import {
  registerUserServices,
  loginUserServices,
  adminLoginServices,
  registerAdminServices,
} from "./auth_service.js";

export const registerUser = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const { user, token } = await registerUserServices(
      data.email,
      data.password,
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user, token } = await loginUserServices(data.email, data.password);
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user, token } = await adminLoginServices(data.email, data.password);
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const adminRegister = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const { user, token } = await registerAdminServices(
      data.email,
      data.password,
    );
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
