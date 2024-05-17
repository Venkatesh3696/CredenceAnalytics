const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const cors = require("cors");
const morgan = require("morgan");
const moviesRoute = require("./routes/movies.route.js");

require("dotenv").config();

// db connection
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/movies", moviesRoute);

app.listen(5000, () => {
  console.log("app is listening at 5000");
});
