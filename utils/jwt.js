const jwt = require("jsonwebtoken");

// Function to create a JWT token with a given payload.
const createJWT = ({ payload }) => {
  // create token by using sign method including expression date
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// Function to verify if a given JWT token is valid.
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// Function to attach a JWT token to the response as a cookie.
const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = createJWT({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
