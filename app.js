require('dotenv').config();

const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const accessLogger = require('./middlewares/accessLogger');
const { connectDatabase } = require('./config/database');

// Carga los modelos antes de sincronizar la base de datos.
require('./models/Paciente');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite que Express reciba información en formato JSON.
app.use(express.json());

// Registra cada acceso realizado al servidor.
app.use(accessLogger);

// Expone los recursos estáticos de KineAgenda.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas principales heredadas del Módulo 6.
app.use('/', mainRoutes);

// Rutas relacionadas con los pacientes.
app.use('/pacientes', pacienteRoutes);

// Primero conecta PostgreSQL y luego inicia el servidor Express.
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