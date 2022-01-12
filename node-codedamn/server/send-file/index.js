const express = require("express");
const path = require("path");

const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
