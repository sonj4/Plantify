import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get token from the header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Token is not valid." });
  }
};

export default verifyToken;
