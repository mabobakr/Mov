const winston = require('winston');


module.exports = function()
{
  winston.add(new winston.transports.Console);
  winston.exceptions.handle(new winston.transports.File({ filename: './exceptions.log' }));
  process.on('unhandledRejection', (ex) => { throw ex; })
}