import express from "express";
import {
  createBookControler,
  deleteBookByIDControler,
  getAllBooksControler,
  getBookByIDControler,
  updateBookByIDControler,
} from "../controlers/bookControler/book.controler";
import { isValidMongoObjectID } from "../middlewares/book.middlewares";

const bookRouter = express.Router();

bookRouter.post("/books", createBookControler);

bookRouter.get("/books", getAllBooksControler);
bookRouter.get("/books/:bookId", isValidMongoObjectID, getBookByIDControler);
bookRouter.put("/books/:bookId", isValidMongoObjectID, updateBookByIDControler);
bookRouter.delete("/books/:bookId", isValidMongoObjectID, deleteBookByIDControler);

export default bookRouter;
