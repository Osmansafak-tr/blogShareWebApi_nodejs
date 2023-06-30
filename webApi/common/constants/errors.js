function setError(type, errorCode, status) {
  const error = {
    type: type,
    errorCode: errorCode,
    status: status,
  };
  return error;
}

exports.InvalidIdError = setError("Invalid Id Error", 300, 404);
