require('dotenv').config();

const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');
const accessLogger = require('./middlewares/accessLogger');
const { connectDatabase } = require('./config/database');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite recibir datos JSON en las próximas rutas CRUD.
app.use(express.json());

// Registra cada acceso realizado al servidor.
app.use(accessLogger);

// Expone los recursos estáticos de KineAgenda.
// Por ejemplo: /public/css/styles.css
app.use('/public', express.static(path.join(__dirname, 'public')));

// Conecta las rutas principales de la aplicación.
app.use('/', mainRoutes);

// Comprueba PostgreSQL antes de iniciar el servidor.
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar KineAgenda:', error.message);
    process.exit(1);
  }
};

startServer();