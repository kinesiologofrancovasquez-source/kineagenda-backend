require('dotenv').config();

const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');
const registroRoutes = require('./routes/registroRoutes');
const accessLogger = require('./middlewares/accessLogger');
const { connectDatabase } = require('./config/database');

// Carga todos los modelos y sus relaciones.
require('./models');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite recibir información en formato JSON.
app.use(express.json());

// Registra cada acceso realizado al servidor.
app.use(accessLogger);

// Expone los recursos estáticos de KineAgenda.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas principales heredadas del Módulo 6.
app.use('/', mainRoutes);

// Rutas de pacientes.
app.use('/pacientes', pacienteRoutes);

// Rutas de citas.
app.use('/citas', citaRoutes);

// Registro de paciente y primera cita mediante una transacción.
app.use('/registro-completo', registroRoutes);

// Conecta PostgreSQL antes de iniciar Express.
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      'No fue posible iniciar KineAgenda:',
      error.message
    );

    process.exit(1);
  }
};

startServer();