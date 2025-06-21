import mongoose, { model, Schema } from "mongoose";
import { BorrowInput } from "../interfaces/book.interface";

const borrowSchema = new Schema<BorrowInput>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less than 1"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<BorrowInput>("Borrow", borrowSchema);
