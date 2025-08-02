const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = app;
