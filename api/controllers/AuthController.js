import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Hashes the password and returns the hashed value
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const registerUser = async (req, res) => {
  // Extract username and password from the request body
  const { email, username, password, isAdmin } = req.body;

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user document
    const user = new User({ email, username, password: hashedPassword, isAdmin });

    // Save the user document to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id, username, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and success message in the response
    res.status(200).json({ token, message: "User registered successfully" });
  } catch (error) {
    // Handle any error that occurred during the registration process
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user in the database based on the username
    const user = await User.findOne({ username });

    // If the user is not found, return an authentication error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an authentication error
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id, username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and success message in the response
    res.status(200).json({ token, message: "User logged in successfully" });
  } catch (error) {
    // Handle any error that occurred during the login process
    res.status(500).json({ error: "Login failed" });
  }
};
