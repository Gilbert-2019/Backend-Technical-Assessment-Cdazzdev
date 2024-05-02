const userRoute = require("express").Router();
const User = require("../Models/UserModel.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");

// LOGIN
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  })
);

// REGISTER
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {

      if (!name || !email || !password) {
        throw new Error("Please fill all the fields");
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already exists");
      }


      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        throw new Error("Invalid User Data");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
);

module.exports = userRoute;
