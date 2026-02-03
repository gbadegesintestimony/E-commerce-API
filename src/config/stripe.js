import Stripe from "stripe";
import { env } from "./env.js";

if (!env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is missing");
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
