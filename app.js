require('dotenv').config();

const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');
const accessLogger = require('./middlewares/accessLogger');

const app = express();

const PORT = process.env.PORT || 3000;

// Registra cada acceso realizado al servidor.
app.use(accessLogger);

// Expone los recursos estáticos de KineAgenda.
// Por ejemplo: /public/css/styles.css
app.use('/public', express.static(path.join(__dirname, 'public')));

// Conecta las rutas principales de la aplicación.
app.use('/', mainRoutes);

// Inicia el servidor utilizando el puerto configurado en .env.
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});