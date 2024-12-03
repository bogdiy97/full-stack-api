const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./db/conn"); // Ensure this points to the correct Sequelize setup
const db = require("./models"); // Make sure your `./models/index.js` exists and is properly configured

const app = express();
app.use(express.json());

// Enable CORS with a more secure setup
app.use(
  cors({
    origin: "https://soft-meerkat-805c88.netlify.app", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is included
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true, // If you're using cookies or tokens in the headers
  })
);

// Handle preflight requests
app.options("*", cors());

// Test route for database connection
app.get("/b4zwhmdvajn65wlzrhuf", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.json({ message: "Database connected successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: error });
  }
});

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});

// Synchronize Sequelize models with the database and start the server
db.sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
