import { z } from "zod";
import { IBook } from "../interfaces/book.interface";

export const bookValidationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().trim().min(1, "ISBN is required"),
  description: z.string().max(10000).optional(),
  copies: z.number().int().min(1, { message: "Copies must be at least 1" }),
  available: z.boolean().default(true).optional(),
});

export const updateBookValidationSchema = bookValidationSchema.partial()
