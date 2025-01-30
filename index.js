// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/sk", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define user schema and model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Secret key for JWT
// const JWT_SECRET = "sk";

// // Register route
// app.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully." });
//   } catch (error) {
//     console.error("Error in /register:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Login route
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful.", token });
//   } catch (error) {
//     console.error("Error in /login:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Middleware for authentication
// function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     req.user = user;
//     next();
//   });
// }

// // Protected route example
// app.get("/getPassword/:username", authenticateToken, async (req, res) => {
//   const { username } = req.params;

//   if (!username) return res.status(400).json({ message: "Username is required." });

//   const user = await User.findOne({ username });
//   if (!user) return res.status(404).json({ message: "User not found." });

// //   res.status(200).json({ message: `User ${username} exists.` });
//   res.status(200).json({ hashedPassword: user.password });
  

// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
