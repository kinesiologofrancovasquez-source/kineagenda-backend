const { Sequelize } = require('sequelize');

// Configuración central de la conexión de KineAgenda con PostgreSQL.
// Los datos sensibles se obtienen desde las variables de entorno.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false
  }
);

// Comprueba que PostgreSQL esté disponible antes de trabajar con los modelos.
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos PostgreSQL conectada correctamente');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDatabase
};