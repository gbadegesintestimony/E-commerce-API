import prisma from "../../config/database.js";

export const addToCart = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) throw new Error("Product not found");

  const existing = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return prisma.cartItem.create({
    data: { userId, productId, quantity },
  });
};

export const getCart = (userId) => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
};

export const clearCart = (userId) => {
  return prisma.cartItem.deleteMany({ where: { userId } });
};
