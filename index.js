// Importing required modules
const express = require("express");
require("express-async-errors");
const app = express();
const winston = require("winston");
const config = require("config");

// Call start up functions
require("./startup/dbconnect")();
require("./startup/routes")(app);
require("./startup/error")();

if (!config.get("jwtPrivateKey")) {
  winston.error("FATAL ERROR!!: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Starting listening on the port
let port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});
