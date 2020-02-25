const mongoose = require('mongoose');


// connecting to the database
module.exports = function()
{
  mongoose.connect('mongodb://localhost/mov')
  .then(()=> { console.log('okay ready to do it')});
}