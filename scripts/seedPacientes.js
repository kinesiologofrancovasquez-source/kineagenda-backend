require('dotenv').config();

const { sequelize } = require('../config/database');
const Paciente = require('../models/Paciente');

const cargarPacientes = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const pacientes = [
      {
        nombre: 'Camila',
        apellido: 'Rojas',
        email: 'camila.rojas@kineagenda.cl',
        telefono: '+56987654321',
        estado: 'activo'
      },
      {
        nombre: 'Matías',
        apellido: 'Sepúlveda',
        email: 'matias.sepulveda@kineagenda.cl',
        telefono: '+56976543210',
        estado: 'activo'
      },
      {
        nombre: 'Valentina',
        apellido: 'Muñoz',
        email: 'valentina.munoz@kineagenda.cl',
        telefono: '+56965432109',
        estado: 'activo'
      }
    ];

    for (const paciente of pacientes) {
      const [, creado] = await Paciente.findOrCreate({
        where: {
          email: paciente.email
        },
        defaults: paciente
      });

      if (creado) {
        console.log(`Paciente creado: ${paciente.nombre} ${paciente.apellido}`);
      } else {
        console.log(`Paciente existente: ${paciente.nombre} ${paciente.apellido}`);
      }
    }

    console.log('Carga inicial de pacientes finalizada correctamente');
  } catch (error) {
    console.error('Error al cargar los pacientes:', error.message);
  } finally {
    await sequelize.close();
  }
};

cargarPacientes();