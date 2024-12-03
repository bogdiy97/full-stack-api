const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables early
const sequelize = require("./db/conn"); // Ensure this points to the correct Sequelize setup
const db = require("./models"); // Make sure your `./models/index.js` exists and is properly configured

const app = express();
app.use(express.json());
app
  .use
  // cors({
  //   origin: ["https://your-frontend-name.netlify.app"],
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   credentials: true,
  // })
  ();

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Synchronize Sequelize models with the database and start the server
db.sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3001; // Use the port from environment variables or default to 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
