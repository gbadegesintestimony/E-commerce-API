import prisma from "../../config/database.js";

export const createCategoryServices = async (name) => {
  return prisma.category.create({ data: { name } });
};

export const getCategoriesServices = async () => {
  return prisma.category.findMany();
};
