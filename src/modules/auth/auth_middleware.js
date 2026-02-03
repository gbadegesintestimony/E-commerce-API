import { verifyToken } from "../../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw { status: 401, message: "No token" };

    const token = auth.split(" ")[1];
    req.user = verifyToken(token);

    next();
  } catch {
    next({
      status: 401,
      message: "Invalid token",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
