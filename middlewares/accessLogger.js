const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDirectory, 'access.log');

const accessLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} | ${req.method} | ${req.originalUrl}\n`;

  fs.appendFile(logFile, logEntry, (error) => {
    if (error) {
      console.error('Error al registrar acceso:', error.message);
    }

    next();
  });
};

module.exports = accessLogger;
