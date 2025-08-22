const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoute = require("./routes/chatRoute");
const reportRoute = require("./routes/reportRoute");

const { connectDB } = require("./database/mongodb");

dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load routes...
app.use("/api/v1", chatRoute);
app.use("/api/v1", reportRoute);

// Top-level error handling for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// Optionally catch uncaught exceptions too
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

const PORT = process.env.PORT || 7000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit if DB connection fails
  }
})();
