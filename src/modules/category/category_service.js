import prisma from "../../config/database.js";

export const createCategoryServices = async (name) => {
  return prisma.category.create({ data: { name } });
};

export const getCategoriesServices = async () => {
  return prisma.category.findMany();
};

export const updateCategoryServices = async (id, name) => {
  return prisma.category.update({ where: { id }, data: { name } });
};

export const deleteCategoryServices = async (id) => {
  return prisma.category.delete({ where: { id } });
};
