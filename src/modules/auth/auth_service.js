import prisma from "../../config/database.js";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

export const registerUserServices = async (email, password) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: "Email already exist" };

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { user, token };
};

export const loginUserServices = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "Invalid Credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 400, message: "Invalid Credentials" };

  const token = signToken({
    id: user.id,
    role: user.role,
  });
  return { user, token };
};

export const adminLoginServices = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "Invalid Credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 400, message: "Invalid Credentials" };

  if (user.role !== "ADMIN")
    throw { status: 403, message: "Admin access required" };

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { user, token };
};

export const registerAdminServices = async (email, password) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: "Email already exist" };

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, password: hashed, role: "ADMIN" },
  });

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  return { user, token };
};
