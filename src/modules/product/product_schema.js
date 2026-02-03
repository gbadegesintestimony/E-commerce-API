import { z } from "zod";

/**
 * Create Product Validation
 */
export const createProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  categoryId: z.string().uuid("Invalid category ID"),
  imageUrl: z.string().url().optional(),
});

/**
 * Update Product Validation
 */
export const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
});
