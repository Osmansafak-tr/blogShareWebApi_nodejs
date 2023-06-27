module.exports = (error, req, res, next) => {
  const errorMessage = {
    error: {
      message: error.message,
    },
  };
  return res.status(error.status || 500).json(errorMessage);
};
