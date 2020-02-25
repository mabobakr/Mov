const express = require('express');
const genres = require('../routes/genres');
const home = require('../routes/home');
const customers = require('../routes/customers');
const Movie = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const error = require('../middleware/error');

// Allowing express to parse json files
module.exports = function(app) 
{
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/', home);
  app.use('/api/customers', customers);
  app.use('/api/movies', Movie);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use(error);
}