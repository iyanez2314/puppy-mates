const express = require("express");

// Creating a variable that is holding an instance of the express server
const app = express();

// This will allow us to parse the JSON data that we will be receiving
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we are saving a varaiable with the PORT that we are going to listen on
const PORT = 3000;

// This will allow us to receive a notification in our terminal that our server is on and listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
