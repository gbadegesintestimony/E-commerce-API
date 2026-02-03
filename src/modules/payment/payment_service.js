import { stripe } from "../../config/stripe.js";
import prisma from "../../config/database.js";

export const createPaymentIntent = async (orderId) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: "usd",
    metadata: { orderId },
  });

  await prisma.order.update({
    where: { id: orderId },
    data: { paymentId: paymentIntent.id },
  });

  return paymentIntent;
};
