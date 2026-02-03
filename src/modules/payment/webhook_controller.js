import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error(" Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("Payment succeeded:", paymentIntent.id);

      // TODO:
      // - mark order as PAID
      // - store payment reference
      break;
    }

    case "payment_intent.payment_failed": {
      console.log(" Payment failed");
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
