import express, { Application } from "express";

// const express = require('express');

const app: Application = express();




app.get("/",(req,res)=>{
    res.send("Welcome to Library!!!")
})





export default app