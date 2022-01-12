const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const { username } = req.cookies;

  if (username) {
    return res.render("index", { username });
  }

  res.redirect("/hello");
});

router.get("/hello", (req, res) => {
  const { username } = req.cookies;

  if (username) {
    return res.redirect("/");
  }

  res.render("hello");
});

router.post("/hello", (req, res) => {
  const { username } = req.body;

  res.cookie("username", username);

  res.redirect("/");
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username");

  res.redirect("/hello");
});

module.exports = router;
