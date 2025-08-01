const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = app;
