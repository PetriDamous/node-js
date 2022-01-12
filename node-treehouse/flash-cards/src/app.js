const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

const app = express();

const PORT = 4000;

// Set view engine to pug
app.set("view engine", "pug");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// Main routes
app.use(mainRoutes);

// Card routes
app.use(cardRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found!!!");

  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  res.locals.error = err;

  res.render("error");
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
