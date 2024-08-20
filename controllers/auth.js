const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const register = async (req,res) =>{
  const { email, name, password } = req.body;

  // checking if there is a user that email 
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exist");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role }); // for security, we can only change on MongoDB

  res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.UnauthenticatedError(
        "Please provide both email and password"
      );
    }
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    res.status(StatusCodes.OK).json({ user });
}
const logout = async (req,res) =>{
    res.send('logout')
}

module.exports = {
    register,
    login,
    logout
}