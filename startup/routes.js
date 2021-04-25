const express = require("express");
const genres = require("../routes/genres");
const home = require("../routes/home");
const customers = require("../routes/customers");
const Movie = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const error = require("../middleware/error");
const auth = require("../routes/auth");

module.exports = function (app) {
  // Allowing express to parse json files
  app.use(express.json());
  
  // Define routes
  app.use("/api/auth", auth);
  app.use("/api/genres", genres);
  app.use("/", home);
  app.use("/api/customers", customers);
  app.use("/api/movies", Movie);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);

  // Bind the error handling middleware
  app.use(error);
};
