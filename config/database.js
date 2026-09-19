const { Sequelize } = require('sequelize');

// Configuración central de la conexión de KineAgenda con PostgreSQL.
// Los datos de conexión se obtienen desde las variables de entorno.
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

// Comprueba la conexión y sincroniza los modelos con PostgreSQL.
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    // Crea las tablas que todavía no existan en la base de datos.
    await sequelize.sync();

    console.log('Base de datos PostgreSQL conectada correctamente');
    console.log('Modelos sincronizados correctamente');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDatabase
};