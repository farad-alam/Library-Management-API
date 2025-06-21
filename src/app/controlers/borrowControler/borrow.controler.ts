import express, { Request, Response } from "express";
import { borrowValidationSchema } from "../../validationSchema/borrow.validation";
import { Borrow } from "../../models/borrow.model";
import {
  errorApiResponse,
  formatMongooseError,
  successApiResponse,
} from "../../utils/utils";
import { ZodError } from "zod";
import { Book } from "../../models/book.model";

const borrowRouter = express.Router();

borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  try {
    // validate using zod schema
    const body = await borrowValidationSchema.parseAsync(req.body);

    // find the book exist or not
    const getBookBuyID = await Book.findById(body.book);
    if (!getBookBuyID) {
      res.status(404).send(
        errorApiResponse({
          message: "Book not found",
          success: false,
          error: `No book found with ID: ${body.book}`,
        })
      );
      return;
    }
    // create anew instance in book model
    const newBorrowBook = await Borrow.create(body);
    // console.log(body);
    res.status(201).send(
      successApiResponse({
        message: "Book borrowed successfully",
        success: true,
        data: newBorrowBook,
      })
    );
  } catch (error: any) {
    // Zod error
    if (error instanceof ZodError) {
      res.status(400).send(
        errorApiResponse({
          message: "Validation failed",
          success: false,
          error: formatMongooseError(error),
        })
      );
    }

    // server Error
    res.status(500).send(
      errorApiResponse({
        message: "Unexpected Server Error while trying to Borrow a new book",
        success: false,
        error: error,
      })
    );
  }
});

export default borrowRouter;
