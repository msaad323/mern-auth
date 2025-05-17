import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.status(200).send("Hi from mern auth backend!");
});

app.listen(() => console.log(`server listening on ${PORT}!`));
