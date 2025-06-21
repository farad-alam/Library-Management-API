import express from "express";
import { borrowBookControler, borrowBookSummaryControler } from "../controlers/borrowControler/borrow.controler";


const borrowRouter = express.Router();

borrowRouter.post("/borrow", borrowBookControler);
borrowRouter.get("/borrow",borrowBookSummaryControler)


export default borrowRouter;
