// makes our error handling a bit more reusable

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add a "message" property
    this.code = errorCode;
  }
}

module.exports = HttpError;
