const Records = require("../records");

class Helper {
  // Try Catch middleware
  asyncHandler = (callback) => {
    return async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  };

  notFoundError = (req, res, next) => {
    const err = new Error("Resource Not Found!!!");
    const notFoundStatus = 404;

    err.status = notFoundStatus;

    next(err);
  };

  globalErrorHandler = (err, req, res, next) => {
    const serverErrorStatus = 500;

    res.status(err.status || serverErrorStatus);

    res.json({ error: err.message });
  };

  checkForDuplicate = async (quote, author) => {
    const { records } = await Records.getQuotes();
    return records.some(
      (quoteElm) => quoteElm.author === author && quoteElm.quote === quote
    );
  };

  updateProperties = (quote, author) => {
    if (!quote) {
      return { author };
    }

    if (!author) {
      return { quote };
    }

    return { quote, author };
  };
}

module.exports = new Helper();
