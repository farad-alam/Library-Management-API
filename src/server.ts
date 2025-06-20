import mongoose from "mongoose";
import app from "./app";
import {Server} from 'http'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 3000;

let server:Server

let mongoDB_uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@blogcluster.tzdrh.mongodb.net/l2_lms?retryWrites=true&w=majority&appName=BlogCluster`;

async function main() {
  try {
    await mongoose.connect(mongoDB_uri)
    console.log("DB Connected");
    server = app.listen(PORT, () => {
      console.log(`App is listingin on port ${PORT}`);
    });
  } catch (error) {
    const resObj = {
      message: "Server listning failed",
      success: false,
      error: error,
    };
    console.log(resObj);
  }
}

main();
