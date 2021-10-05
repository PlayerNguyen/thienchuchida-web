const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const users = require("./routers/userRouter");
const books = require("./routers/bookRouter");
const resources = require("./routers/resourceRouter");
const tags = require("./routers/tagRouter");
const chapters = require("./routers/chapterRouter");
const comments = require("./routers/commentRouter");
const settings = require("./routers/settingRouter");
const notify = require("./routers/notifyRouter");
const { middlewareError } = require("./utils/errors-handle");

/**
 * Middleware settings here
 */
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use(compression({ level: 9 }));
/**
 * Initialize stuffs
 */
app.use("/users", users);
app.use("/books", books);
app.use("/resources", resources);
app.use("/tags", tags);
app.use("/chapters", chapters);
app.use("/comments", comments);
app.use("/settings", settings);
app.use("/notify", notify);

/**
 * Closed middleware
 *  to handle errors
 */
app.use(middlewareError);

/**
 * Export express
 */
module.exports = app;
