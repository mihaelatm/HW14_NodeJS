import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
