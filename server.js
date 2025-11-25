const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

const authMiddleware = require("./middleware/auth");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route access granted", user: req.user });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error(err));
