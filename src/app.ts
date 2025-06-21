import express, { Application, Request, Response } from "express";
import bookRouter  from "./app/routes/book.routes";
import borrowRouter from "./app/routes/borrow.routes";


const app: Application = express();


// middlewares------>>>>
app.use(express.json())
app.use("/api", bookRouter)
app.use("/api", borrowRouter)


app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Library!!!");
});

export default app;
