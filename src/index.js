require("./models/Dogs");
require("./models/Users");
require("./models/Posts");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes");
const dogRoutes = require("./routes");
require("dotenv").config();

// Creating a variable that is holding an instance of the express server
const app = express();

// This will allow us to parse the JSON data that we will be receiving
app.use(express.json());
app.use(userRoutes);
app.use(dogRoutes);
app.use(express.urlencoded({ extended: true }));

// Here we are saving a varaiable with the PORT that we are going to listen on
const PORT = process.env.PORT || 3000;
const mongooseUri = process.env.MONGO_URI;
mongoose.connect(mongooseUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connected to mongo", err);
});

// This will allow us to receive a notification in our terminal that our server is on and listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
