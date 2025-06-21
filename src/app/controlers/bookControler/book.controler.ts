import express, { Request, Response } from "express";
import {
  bookValidationSchema,
  updateBookValidationSchema,
} from "../../validationSchema/book.validation";
import {
  errorApiResponse,
  formatMongooseError,
  successApiResponse,
} from "../../utils/utils";
import { ZodError } from "zod";
import { Book } from "../../models/book.model";
import mongoose from "mongoose";

const bookRouter = express.Router();

bookRouter.post("/books", async (req: Request, res: Response) => {
  try {
    // validate using zod schema
    const body = await bookValidationSchema.parseAsync(req.body);
    // create anew instance in book model
    const newBook = await Book.create(body);
    // console.log(body);
    res.status(201).send(
      successApiResponse({
        message: "Book created successfully",
        success: true,
        data: newBook,
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
        message: "Unexpected Server Error while trying to create new book",
        success: false,
        error: error,
      })
    );
  }
});

bookRouter.get("/books", async (req: Request, res: Response) => {
  let { filter, sortBy, sort, limit } = req.query;

  let query = filter ? { genre: filter } : {};

  let sortQuery = {};
  if (typeof sortBy === "string") {
    sortQuery = { [sortBy]: sort == "desc" ? -1 : 1 };
  }

  let resultLimit = limit ? parseInt(limit as string) : 10;

  try {
    // get all book
    const allBooks = await Book.find(query).sort(sortQuery).limit(resultLimit);
    // console.log(body);
    res.status(200).send(
      successApiResponse({
        message: "Books retrieved successfully",
        success: true,
        data: allBooks,
      })
    );
  } catch (error: any) {
    // server Error
    res.status(500).send(
      errorApiResponse({
        message: "Unexpected Server Error while trying to retrive book",
        success: false,
        error: error,
      })
    );
  }
});

bookRouter.get(
  "/books/:bookId",
  async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;

    try {
      // get all book
      const bookById = await Book.findById(bookId);

      // check book found or not
      if (!bookById) {
        res.status(404).send(
          errorApiResponse({
            message: "Book not found",
            success: false,
            error: `No book found with ID: ${bookId}`,
          })
        );
        return;
      }

      // console.log(body);
      res.status(200).send(
        successApiResponse({
          message: "Book retrieved successfully",
          success: true,
          data: bookById,
        })
      );
    } catch (error: any) {
      // server Error
      res.status(500).send(
        errorApiResponse({
          message: "Unexpected Server Error while retriving book",
          success: false,
          error: error,
        })
      );
    }
  }
);

bookRouter.put("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    // check object Id is correct or not
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(404).send(
        errorApiResponse({
          message: "Book  ID is not Correct",
          success: false,
          error: `Your provided book ID: ${bookId} is not correct`,
        })
      );
      return;
    }
    // validate with zod
    const body = await updateBookValidationSchema.parseAsync(req.body);

    // get all book
    const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });

    // Book not found
    if (!updatedBook) {
      res.status(404).send(
        errorApiResponse({
          message: "Book not found",
          success: false,
          error: `No book found with ID: ${bookId}`,
        })
      );
      return;
    }

    // console.log(body);
    res.status(200).send(
      successApiResponse({
        message: "Book updated successfully",
        success: true,
        data: updatedBook,
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
        message: "Unexpected Server Error while trying to update book",
        success: false,
        error: error,
      })
    );
  }
});

bookRouter.delete(
  "/books/:bookId",
  async (req: Request, res: Response) => {
    const { bookId } = req.params;

    try {
      // check object Id is correct or not
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        res.status(404).send(
          errorApiResponse({
            message: "Book  ID is not Correct",
            success: false,
            error: `Your provided book ID: ${bookId} is not correct`,
          })
        );
        return;
      }

      // find and delete the book by id
      const bookById = await Book.findByIdAndDelete(bookId);

      // Book not found
      if (!bookById) {
        res.status(404).send(
          errorApiResponse({
            message: "Book not found",
            success: false,
            error: `No book found with ID: ${bookId}`,
          })
        );
        return
      }
      // console.log(body);
      res.status(200).send(
        successApiResponse({
          message: "Book deleted successfully",
          success: true,
          data: null,
        })
      );
    } catch (error: any) {
      // server Error
      res.status(500).send(
        errorApiResponse({
          message: "Unexpected Server Error happend while trying to delete book",
          success: false,
          error: error,
        })
      );
    }
  }
);

export default bookRouter;
