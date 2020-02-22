// Importing required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/mov')
  .then(()=> { console.log('okay ready to do it')});


// Allowing express to parse json files
app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);
app.use('/api/customers', customers);
// Starting listening on the port
let port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on port ${port}`)});


