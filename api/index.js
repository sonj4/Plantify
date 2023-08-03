import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js"
import notificationRoutes from "./routes/notification.js";
import dotenv from "dotenv"
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/notifications", notificationRoutes);
