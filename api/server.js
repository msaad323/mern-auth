import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db successfully!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("Hi from mern auth backend!");
});

app.listen(() => console.log(`server listening on ${PORT}!`));
