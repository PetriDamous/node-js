const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ greeting: "hello" });
});

app.listen(3000, () => console.log("Quote API listening on port 3000!"));
