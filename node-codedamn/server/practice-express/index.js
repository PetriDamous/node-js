const express = require("express");

const app = express();

const port = 3001;

app.get("/", (req, res) => {
  res.send("Fuckin Shit!!!");
});

app.get("/what-is-my-method", (req, res) => {
  res.send("GET");
});

app.post("/what-is-my-method", (req, res) => {
  res.send("POST");
});

app.put("/what-is-my-method", (req, res) => {
  res.send("PUT");
});

app.delete("/what-is-my-method", (req, res) => {
  res.send("DELETE");
});

app.patch("/what-is-my-method", (req, res) => {
  res.send("PATCH");
});

app.listen(port, () => console.log(`Listening on ${port}`));

// await fetch("/what-is-my-method", {
//   method: "GET",
// })
//   .then((res) => res.text())
//   .then((data) => console.log(data));
