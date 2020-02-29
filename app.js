// Importing required modules
const express = require('express')
require('express-async-errors')
const app = express();
const winston = require('winston');
require('./startup/dbconnect')();
require('./startup/routes')(app);
require('./startup/error')();

// Starting listening on the port
let port = process.env.PORT || 3000;
app.listen(port, () => { winston.info(`listening on port ${port}`); });


