const { sequelize } = require('../config/database');
const { Paciente, Cita } = require('../models');

// Registra un paciente y su primera cita dentro de una misma transacción.
// Si alguna de las dos operaciones falla, PostgreSQL revierte todo el proceso.
const registrarPacienteConCita = async (
  datosPaciente,
  datosCita,
  simularError = false
) => {
  const transaction = await sequelize.transaction();

  try {
    const paciente = await Paciente.create(
      {
        nombre: datosPaciente.nombre,
        apellido: datosPaciente.apellido,
        email: datosPaciente.email,
        telefono: datosPaciente.telefono || null,
        estado: datosPaciente.estado || 'activo'
      },
      {
        transaction
      }
    );

    const cita = await Cita.create(
      {
        fecha: datosCita.fecha,
        hora: datosCita.hora,
        motivo: datosCita.motivo,
        estado: datosCita.estado || 'pendiente',
        observaciones: datosCita.observaciones || null,
        pacienteId: paciente.id
      },
      {
        transaction
      }
    );

    // Se utiliza solamente en desarrollo para comprobar el rollback.
    if (simularError && process.env.NODE_ENV === 'development') {
      throw new Error('Error simulado para comprobar el rollback');
    }

    await transaction.commit();

    console.log(
      `Transacción completada: paciente ${paciente.id} y cita ${cita.id}`
    );

    return {
      paciente,
      cita
    };
  } catch (error) {
    await transaction.rollback();

    console.error(
      `Transacción revertida correctamente: ${error.message}`
    );

    throw error;
  }
};

module.exports = {
  registrarPacienteConCita
};