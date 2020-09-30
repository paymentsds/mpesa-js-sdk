class MissingPropertiesError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "MissingPropertiesError";
    this.message = message || "There are attributes missing to complete the transaction";
  }
}

class AuthenticationError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "AuthenticationError";
    this.message = message || "There is not a public key and API key or access token set";
  }
}

class InvalidReceiverError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "InvalidReceiverError";
    this.message =
      message ||
      "The receiver does not look like a valid phone number nor a valid service provider code";
  }
}

class ValidationError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "ValidationError";
    this.message = message || "The data provider is not valid";
  }
}

class InvalidHostError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "InvalidHostError";
    this.message = message || "The provider host is not valid";
  }
}

class TimeoutError extends Error {
  constructor(name, message) {
    super();
    this.name = name || "TimeoutError";
    this.message = message || "The request has taken more time than allowed";
  }
}

export {
  MissingPropertiesError,
  AuthenticationError,
  InvalidReceiverError,
  ValidationError,
  InvalidHostError,
  TimeoutError,
};
