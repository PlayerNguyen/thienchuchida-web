const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { middlewareError } = require("./utils/errors-handle");
const users = require("./routers/userRouter");
const books = require("./routers/books/bookRouter");
const resources = require("./routers/resourceRouter");
/**
 * Middleware settings here
 */

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
/**
 * Initialize stuffs
 */
app.use("/users", users);
app.use("/books", books);
app.use("/resources", resources);
app.use("/uploads", express.static("uploads"));

/**
 * Closed middleware
 *  to handle errors
 */
app.use(middlewareError);

/**
 * Export express
 */
module.exports = app;
