import mongoose from "mongoose";
import { z } from "zod";

export const borrowValidationSchema = z.object({
  book: z
    .string()
    .min(1, { message: "Book ID is required" })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid MongoDB Object ID",
    })
    .transform((id) => new mongoose.Types.ObjectId(id)),
  quantity: z.number().min(1, { message: "Quantity can not be les than 1" }),
  dueDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
});

// dueDate: z
//     .string()
//     .transform((val) => new Date(val))
//     .refine((date) => !isNaN(date.getTime()), {
//       message: "Invalid date format",
//     }),
