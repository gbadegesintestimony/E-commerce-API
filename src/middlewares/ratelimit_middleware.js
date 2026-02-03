import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 100, // 100 request per ip
  message: "Too many request",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // login attempts
  message: "Too many login attempts",
});
