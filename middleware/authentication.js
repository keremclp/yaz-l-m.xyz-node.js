const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

// Middleware to authenticate the user based on a signed JWT token.
const authenticateUser = async (req, res, next) => {
  // Retrieve the signed token from cookies
  const token = req.signedCookies.token;

  // If no token is found, throw an authentication error
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    // Validate the token and decode the payload
    const payload = isTokenValid({ token });

    // Attach user information from the token payload to the request object
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };

    // Proceed to the next middleware
    next();
  } catch (error) {
    // If token validation fails, throw an authentication error
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

// Middleware to authorize user roles for specific routes
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      // If not, throw an UnauthorizedError
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    // If the user's role is authorized, proceed to the next middleware/route handler
    next();
  };
};
module.exports = { authenticateUser,authorizePermissions }