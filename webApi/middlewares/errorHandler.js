const { AppError } = require("../common/index").classes;

module.exports = (error, req, res, next) => {
  if (error instanceof AppError) {
    // AppError instances
    const processedError = {
      error: {
        message: error.message,
      },
    };

    return res.status(error.status || 500).json(processedError);
  }

  if (error.errors != undefined) {
    // Validation Error
    const processedError = {
      errors: error.errors,
    };

    return res.status(403).json(processedError);
  }

  // Other Errors
  console.log(error);
  const processedError = {
    error: {
      message: error.message,
    },
  };
  return res.status(error.status || 500).json(processedError);
};
