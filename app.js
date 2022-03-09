require("dotenv").config();
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var createError = require("http-errors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recipeRouter = require("./routes/recipe");
var contactUsRouter = require("./routes/contactUs");
var CategoriesRoute = require("./routes/categories");
var userRoutes = require("./routes/users");
var filesRouter = require("./routes/file");

//my midlwares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

var createError = require("http-errors");
const IS_PRODUCTION = app.get("env") === "production";
if (IS_PRODUCTION) {
  app.set("trust proxy", 1); // secures the app if it is running behind Nginx/Apache/similar
}
app.use(cors()); // allows cross domain requests
//app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))) // <-- location of favicon

// Connect to DB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
  })
  .catch(console.error);

//my routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/contactUs", contactUsRouter);
app.use("/api/categories", CategoriesRoute);
app.use("/api/users", userRoutes);
app.use("/api/files", filesRouter);

// create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler midlware
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

module.exports = app;
