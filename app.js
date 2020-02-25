// Importing required modules
const express = require('express');
const app = express();
require('./startup/dbconnect')();
require('./startup/routes')(app);


// Starting listening on the port
let port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`listening on port ${port}`)});


