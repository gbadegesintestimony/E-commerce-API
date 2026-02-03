import { createPaymentIntent } from "./payment_service.js";

export const payOrder = async (req, res) => {
  try {
    const intent = await createPaymentIntent(orderId);
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
