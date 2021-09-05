const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const users = require("./routers/userRouter");
const books = require("./routers/bookRouter");
const resources = require("./routers/resourceRouter");
const tags = require("./routers/tagRouter");
const { middlewareError } = require("./utils/errors-handle");
const mongoose = require("mongoose");
const DatabaseConfig = require("./config/database.config");
// const MiscConfig = require("./config/misc.config");
const { fetchCors } = require("./utils/corsLoader");
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
    // origin: MiscConfig.cors.whitelist,
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
app.use("/tags", tags);
app.use("/uploads", express.static("uploads"));

/**
 * Closed middleware
 *  to handle errors
 */
app.use(middlewareError);

/**
 * Database initialize
 */
 mongoose.connect(process.env.DATABASE_URL);
 mongoose.connection.on("error", (err) => {
   console.log("err", err);
 });
 mongoose.connection.on("connected", () => {
   console.log("mongoose is connected");
 });
setTimeout(() => {
  
}, DatabaseConfig.ConnectionDelay);

/**
 * Export express
 */
module.exports = app;
