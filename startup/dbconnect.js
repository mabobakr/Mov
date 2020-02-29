const mongoose = require('mongoose');
const winston = require('winston');

// connecting to the database
module.exports = function()
{
  mongoose.connect('mongodb://localhost/mov')
  .then(()=> { winston.info('Connected to the db')});
}