const express = require("express");
const routes = require("./routes");
const { notFoundError, globalErrorHandler } = require("./helpers");

// Challenge. Prevent duplicate quotes from being posted.
// Challenge. When updating quote check for if data is the shape we want (string, object, etc)
// also check for empty properties.
// Challenge.  Try include the custom error handling inside of each route to use the global middleware error handler.

const app = express();

app.use(express.json());

app.use("/api", routes);

// Not found middleware error handler
app.use(notFoundError);

// Global middleware error handler
app.use(globalErrorHandler);

app.listen(3000, () => console.log("Quote API listening on port 3000!"));
