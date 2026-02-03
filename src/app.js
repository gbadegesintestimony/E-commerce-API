import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middlewares/error_middlewares.js";
import routes from "./routes/route.js";
import { stripeWebhook } from "./modules/payment/webhook_controller.js";
import { apiLimiter, authLimiter } from "./middlewares/ratelimit_middleware.js";
const app = express();

// Logging
app.use(logger);

// Security middlewares
app.use(helmet());
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

//  Stripe Webhook
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// Body Parsing
app.use(express.json());

// Rate Limiting
app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

// API Routes
app.use("/api", routes);

// Error Handling
app.use(errorHandler);

export default app;
