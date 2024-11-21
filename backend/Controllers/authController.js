import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import generateTokenAndSetCookie from "../utils/generateToken.js";  // Token generation helper

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save(); // Save the user

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,  // Include email in response
      isAdmin: newUser.isAdmin,  // Include isAdmin flag if needed
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });  // Corrected to find by email
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If the credentials are correct, generate a JWT token and set it as a cookie
    generateTokenAndSetCookie(user._id, res);

    // Return the user data along with the isAdmin flag
    res.json({
      msg: "Login successful",
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,  // Return isAdmin flag to indicate if the user is an admin
    });
  } catch (err) {
    console.error("Error in login controller:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",  // Automatically handle this for production
  });

  res.json({ msg: "Logged out successfully" });
};
