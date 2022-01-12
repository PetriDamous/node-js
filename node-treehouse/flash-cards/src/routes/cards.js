const express = require("express");
const { randomCardIndex, isObjEmpty } = require("../helpers/functions");

const {
  data: { cards },
} = require("./../data/data.json");

console.log(cards);

const router = express.Router();

router.get("/cards", (req, res) => {
  const cardIndex = randomCardIndex(cards);

  res.redirect(`/cards/${cardIndex}?side=question`);
});

router.get("/cards/:id", (req, res) => {
  const { id: cardId } = req.params;
  const { side } = req.query;
  const { username } = req.cookies;
  const showHint = side === "question" ? true : false;
  const reverseSide = side === "question" ? "answer" : "question";

  if (!side || isObjEmpty(side)) {
    return res.redirect(`/cards/${cardId}?side=question`);
  }

  const cardData = {
    text: cards[cardId][side],
    hint: cards[cardId].hint,
    showHint,
    reverseSide,
    cardId,
    username,
  };

  res.render("card", cardData);
});

module.exports = router;
