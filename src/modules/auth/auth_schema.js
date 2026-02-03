import { z } from "zod";

export const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
});

export const loginSchema = registerSchema;
