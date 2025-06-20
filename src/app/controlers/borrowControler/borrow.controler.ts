import express, { Request, Response } from "express";

const borrowRouter = express.Router()

borrowRouter.get("/borrow/:bookID", (req: Request, res: Response) => {
  res.send({ message: "borrow router" });
});


export default borrowRouter