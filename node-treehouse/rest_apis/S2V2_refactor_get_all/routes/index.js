const express = require("express");
const { asyncHandler } = require("../helpers");
const {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getRandomQuote,
} = require("../records");

const router = express.Router();

// Send a GET request to /quotes to READ a list of quotes
router.get(
  "/quotes",
  asyncHandler(async (req, res, next) => {
    const quotes = await getQuotes();

    res.json(quotes);
  })
);

// Send a GET request to /quotes/:id to READ(view) a quote
router.get(
  "/quotes/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quote = await getQuote(id);

    if (!quote) {
      return res.status(404).json({ error: "Unable to find quote." });
    }

    res.json(quote);
  })
);

// Send a POST request to /quotes to  CREATE a new quote
router.post(
  "/quotes",
  asyncHandler(async (req, res) => {
    const { quote, author } = req.body;

    if (!quote || !author) {
      return res.status(400).json({ error: "Bad request." });
    }

    const newQuote = await createQuote({ quote, author });

    res.status(201).json(newQuote);
  })
);

// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
router.put(
  "/quotes/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { quote, author } = req.body;

    const currentQuote = await getQuote(id);

    if (!currentQuote) {
      return res.status(404).json({ error: "Quote not found." });
    }

    const updatedQuote = { ...currentQuote, quote, author };

    await updateQuote(updatedQuote);

    res.status(204).end();
  })
);

// Send a DELETE request to /quotes/:id DELETE a quote
router.delete(
  "/quotes/:id",
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;

      const quoteToDelete = await getQuote(id);

      if (!quoteToDelete) {
        return res.status(404).json({ error: "Quote not found!!" });
      }

      await deleteQuote(quoteToDelete);

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  })
);

// Send a GET request to /quotes/quote/random to READ (view) a random quote
router.get(
  "/quotes/quote/random",
  asyncHandler(async (req, res, next) => {
    const quote = await getRandomQuote();

    res.status(201).json(quote);
  })
);

module.exports = router;
