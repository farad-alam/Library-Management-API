import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import { errorApiResponse } from "../utils/utils";

export const isValidMongoObjectID = (
  req: Request,
  res: Response,
  next: NextFunction
):  void => {
  const { bookId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).send(
      errorApiResponse({
        message: "Invalid Book ID",
        success: false,
        error: `The provided ID (${bookId}) is not a valid MongoDB ObjectId.`,
      })
    );
    return
  }
   next();
};
