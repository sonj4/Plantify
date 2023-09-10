import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const registerUser = async (req, res) => {
  const { email, username, password, isAdmin } = req.body;
  console.log("REGISTER USRE: ", email, username, password, isAdmin)

  try {
    const hashedPassword = await hashPassword(password);

    const user = new User({ email, username, password: hashedPassword, isAdmin: false });

    await user.save();

    const token = jwt.sign({ _id: user._id, username, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.status(200).json({ token, isAdmin: user.isAdmin, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
  
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ _id: user._id, username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({ token, isAdmin: user.isAdmin, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
