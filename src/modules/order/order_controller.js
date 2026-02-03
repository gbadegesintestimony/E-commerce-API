import { checkOut } from "./order_service.js";

export const checkOutOrder = async (req, res) => {
  try {
    const order = await checkOut(req.user.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
