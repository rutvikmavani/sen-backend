// Import Dependencies
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Route Imports
const facultyApi = require("./routes/faculty");
const signInApi = require("./routes/signin");
const collegeApi = require("./routes/college");

app.use(morgan("tiny")); // Custom logging of requests
app.use(helmet()); // Sanitization of requests
app.use(express.json()); // Parsing requests as in JSON format

//Use CORS
app.use(cors());

// Connect to database
//mongoose.connect(process.env.DB_ADDRESS, { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/facultyDir", { useNewUrlParser: true });
mongoose.set("debug", true);
const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "MongoDB Error: "));
conn.on("connected", () => {
  console.log("Connected To Database...");
});

//API Routes
app.use("/api/faculty", facultyApi);
app.use("/api/signin", signInApi);
app.use("/api/college", collegeApi);

// Error handling
app.use((req, res) => {
  res.status(500).json({ message: "Server Error, Something Broke" });
});

module.exports = app;