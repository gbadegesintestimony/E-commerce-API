import * as cartService from "./cart_service.js";

export const addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.addToCart(req.user.id, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
export const getUserCart = async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.json(cart);
};
