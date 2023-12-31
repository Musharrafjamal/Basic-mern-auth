const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://musharrafjamal92:Zg3NQbNL8AsZqhQb@cluster0.dlalseg.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "auth" }
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => console.log("Error on connection to mongoDB", err));

// Middlewares
app.use(cors());
app.use(express.json({ limit: '500mb' })); 
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use("/auth", authRoutes);

// Define a simple route
app.get("/auth", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});

// Start the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
