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



export const borrowBookControler =  async (req: Request, res: Response) => {
  try {
    // validate using zod schema
    const body = await borrowValidationSchema.parseAsync(req.body);

    // find the book exist or not
    const getBookByID = await Book.findById(body.book);
    console.log(getBookByID);
    if (!getBookByID) {
      res.status(404).send(
        errorApiResponse({
          message: "Book not found",
          success: false,
          error: `No book found with ID: ${body.book}`,
        })
      );
      return;
    }

    // copies avilable or not
    if (!getBookByID.available || getBookByID.copies ===0 ) {
      res.status(409).send(
        errorApiResponse({
          message: "Book is not avilable to Borrow",
          success: false,
          error: `Book with ID: ${body.book} is not currently avilable.`,
        })
      );
      return;
    }

    // reduce by quantity 
    if (getBookByID.copies >= body.quantity ) {
      getBookByID.copies -= body.quantity
      await getBookByID.save()

      // update avilability
      await getBookByID.updateAvailableStatus();
    } else{
      res.status(409).send(
        errorApiResponse({
          message: "Not enough copies available",
          success: false,
          error: `Only ${getBookByID.copies} copies available, but ${body.quantity} requested.`,
        })
      );
      return
    }

    // create anew instance in Borrowbook model
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
};


export const borrowBookSummaryControler =  async (req: Request, res: Response) => {
  try {


    // 
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    // console.log(body);
    res.status(200).send(
      successApiResponse({
        message: "Borrowed books summary retrieved successfully",
        success: true,
        data: summary,
      })
    );
  } catch (error: any) {

    // server Error
    res.status(500).send(
      errorApiResponse({
        message:
          "Unexpected Server Error while trying to genarate Borrowed books summary",
        success: false,
        error: error,
      })
    );
  }
};


