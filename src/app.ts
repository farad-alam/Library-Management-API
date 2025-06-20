import express, { Application, Request, Response } from "express";

// const express = require('express');

const app: Application = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Library!!!");
});

export default app;
