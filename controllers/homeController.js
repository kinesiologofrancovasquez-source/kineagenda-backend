const path = require('path');

// Controlador encargado de mostrar la página principal de KineAgenda.
const getHome = (req, res) => {
  const homePath = path.join(__dirname, '..', 'public', 'index.html');

  res.sendFile(homePath);
};

module.exports = {
  getHome
};