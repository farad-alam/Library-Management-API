import { Types } from "mongoose";
import { z } from "zod";
import { borrowValidationSchema } from "../validationSchema/borrow.validation";

enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface IBookDocument extends IBook, Document {
  updateAvailableStatus: () => Promise<IBookDocument>;
}

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export type BorrowInput = z.infer<typeof borrowValidationSchema>;

// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.

export interface ApiResponse<T> {
  message: string;
  success: boolean;
  error?: T;
  data?: T;
}

// const result = successApiResponse({
//   message: "apirequest succes",
//   success: true,
//   data: { ...responseResult}
// })

// const errorResult = errorApiResponse({
//   message: "apirequest succes",
//   success: true,
//   error: { ...errorResResult}
// })
