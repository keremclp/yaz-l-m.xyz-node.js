const CustomError = require("./custom-api");
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
