import express, { Request, Response } from "express";
import { bookValidationSchema } from "../../validationSchema/book.validation";
import {
  errorApiResponse,
  formatMongooseError,
  successApiResponse,
} from "../../utils/utils";
import { ZodError } from "zod";
import { Book } from "../../models/book.model";

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
    res.status(400).send(
      errorApiResponse({
        message: "Unexpected Server Error",
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
    sortQuery = { [sortBy]: sort || "asc" };
  }

  let resultLimit = limit ? parseInt(limit as string) : 10;

  try {
    // create anew instance in book model
    const allBooks = await Book.find(query).sort(sortQuery).limit(resultLimit);
    // console.log(body);
    res.status(201).send(
      successApiResponse({
        message: "Books retrieved successfully",
        success: true,
        data: allBooks,
      })
    );
  } catch (error: any) {
    // server Error
    res.status(400).send(
      errorApiResponse({
        message: "Unexpected Server Error",
        success: false,
        error: error,
      })
    );
  }
});
export default bookRouter;
