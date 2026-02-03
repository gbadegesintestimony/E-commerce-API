import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 8000,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
};
