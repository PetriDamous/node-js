const express = require("express");
const path = require("path");

const app = express();

const PORT = 3001;

const publicPath = path.resolve(__dirname, "public");

// Will serve up static assets to client side.
app.use(express.static(publicPath));

// Nodes native way to parse JSON data
app.use(express.json());

app.post("/", (req, res) => {
  // Getting the body of the request.
  // Already parsed by express.json()
  console.log(req.body);

  // Sending json data back to front-end
  res.json({ status: "ok nigga!!!" });
});

app.listen(3001, () => console.log(`On port ${PORT}`));
