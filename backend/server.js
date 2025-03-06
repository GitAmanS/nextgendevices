require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());



// Test API
app.get("/", (req, res) => res.send("Backend Running!"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
