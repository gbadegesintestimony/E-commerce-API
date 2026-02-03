import prisma from "../../config/database.js";

export const createProductServices = async (data) => {
  return prisma.product.create({ data });
};

export const getProductServices = async (search, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const where = search
    ? { name: { contains: search, mode: "insensitive" } }
    : {};
  const product = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    include: { category: true },
  });

  const total = await prisma.product.count({ where });

  return { products, total, page, limit };
};

export const getProductByIdServices = async (id) => {
  return prisma.product.findUnique({ where: { id } });
};

export const updateProductServices = async (id, data) => {
  return prisma.product.update({ where: id, data });
};

export const deleteProductServices = async (id) => {
  return prisma.product.delete({ where: id });
};
