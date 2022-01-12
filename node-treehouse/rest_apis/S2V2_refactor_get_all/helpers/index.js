// Try Catch middleware
const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const notFoundError = (req, res, next) => {
  const err = new Error("Resource Not Found!!!");
  const notFoundStatus = 404;

  err.status = notFoundStatus;

  next(err);
};

const globalErrorHandler = (err, req, res, next) => {
  const serverErrorStatus = 500;

  res.status(err.status || serverErrorStatus);

  res.json({ error: err.message });
};

module.exports = {
  asyncHandler,
  notFoundError,
  globalErrorHandler,
};
