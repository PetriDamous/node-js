const express = require("express");
const Helper = require("../helpers");
const Records = require("../records");

const router = express.Router();

// Send a GET request to /quotes to READ a list of quotes
router.get(
  "/quotes",
  Helper.asyncHandler(async (req, res, next) => {
    const quotes = await Records.getQuotes();

    res.json(quotes);
  })
);

// Send a GET request to /quotes/:id to READ(view) a quote
router.get(
  "/quotes/:id",
  Helper.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quote = await Records.getQuote(id);

    if (!quote) {
      return res.status(404).json({ error: "Unable to find quote." });
    }

    res.json(quote);
  })
);

// Send a POST request to /quotes to  CREATE a new quote
router.post(
  "/quotes",
  Helper.asyncHandler(async (req, res) => {
    const { quote, author } = req.body;

    if (!quote || !author) {
      return res
        .status(400)
        .json({ error: "Quote and author must be provided." });
    }

    const isDuplicate = await Helper.checkForDuplicate(quote, author);

    if (isDuplicate) {
      return res.status(400).json({ error: "Cannot accept duplicate." });
    }

    const newQuote = await Records.createQuote({ quote, author });

    res.status(201).json(newQuote);
  })
);

// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
router.put(
  "/quotes/:id",
  Helper.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { quote, author } = req.body;

    const currentQuote = await Records.getQuote(id);

    if (!currentQuote) {
      return res.status(404).json({ error: "Quote not found." });
    }

    const isDuplicate = await Helper.checkForDuplicate(quote, author);

    if (isDuplicate) {
      return res.status(400).json({ error: "Cannot accept duplicate." });
    }

    const updatedProperties = Helper.updateProperties(quote, author);

    const updatedQuote = { ...currentQuote, ...updatedProperties };

    await Records.updateQuote(updatedQuote);

    res.status(204).end();
  })
);

// Send a DELETE request to /quotes/:id DELETE a quote
router.delete(
  "/quotes/:id",
  Helper.asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const quoteToDelete = await Records.getQuote(id);

    if (!quoteToDelete) {
      return res.status(404).json({ error: "Quote not found!!" });
    }

    await Records.deleteQuote(quoteToDelete);

    res.status(204).end();
  })
);

// Send a GET request to /quotes/quote/random to READ (view) a random quote
router.get(
  "/quotes/quote/random",
  Helper.asyncHandler(async (req, res, next) => {
    const quote = await Records.getRandomQuote();

    res.status(201).json(quote);
  })
);

module.exports = router;
