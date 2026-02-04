import prisma from "../../config/database.js";

export const checkOut = async (userId) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    if (cart.length === 0) throw new Error("cart is empty");

    let total = 0;

    for (const item of cart) {
      if (item.product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${item.product.name}`);
      }
      total += item.product.price * item.quantity;
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,
        items: {
          create: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Deduct stock
    for (const item of cart) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({ where: { userId } });

    return order;
  });
};
