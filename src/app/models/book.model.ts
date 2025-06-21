import { model, Schema } from "mongoose";
import { IBookDocument } from "../interfaces/book.interface";

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      trim: true,
    },
    isbn: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, maxlength: 10000 },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies cannot be negative"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

bookSchema.methods.updateAvailableStatus = async function () {
  this.available = this.copies > 0;
  return await this.save();
};

export const Book = model<IBookDocument>("Book", bookSchema);
