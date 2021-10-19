const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.json({message: "hello"})
})

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

module.exports = app;
