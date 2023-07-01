function setError(type, errorCode, status) {
  const error = {
    type: type,
    errorCode: errorCode,
    status: status,
  };
  return error;
}

exports.DataNotFound = setError("Invalid Id Error", 300, 404);
exports.SameDataAlreadyCreated = setError("Same Data Created Error", 301, 400);
