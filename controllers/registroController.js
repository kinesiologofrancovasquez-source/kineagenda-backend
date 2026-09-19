const registroService = require('../services/registroService');

// POST /registro-completo
// Registra un paciente junto con su primera cita en una sola transacción.
const postRegistroCompleto = async (req, res) => {
  try {
    const {
      paciente,
      cita,
      simularError = false
    } = req.body;

    if (!paciente || !cita) {
      return res.status(400).json({
        status: 'error',
        message: 'Los datos del paciente y de la cita son obligatorios'
      });
    }

    const {
      nombre,
      apellido,
      email
    } = paciente;

    const {
      fecha,
      hora,
      motivo
    } = cita;

    if (!nombre || !apellido || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Nombre, apellido y email del paciente son obligatorios'
      });
    }

    if (!fecha || !hora || !motivo) {
      return res.status(400).json({
        status: 'error',
        message: 'Fecha, hora y motivo de la cita son obligatorios'
      });
    }

    const resultado = await registroService.registrarPacienteConCita(
      paciente,
      cita,
      simularError
    );

    return res.status(201).json({
      status: 'success',
      message: 'Paciente y primera cita registrados correctamente',
      data: resultado
    });
  } catch (error) {
    console.error(
      'Error en el registro completo:',
      error.message
    );

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 'error',
        message: 'Ya existe un paciente registrado con ese email'
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: error.errors[0].message
      });
    }

    if (
      error.message ===
      'Error simulado para comprobar el rollback'
    ) {
      return res.status(500).json({
        status: 'error',
        message: 'Transacción revertida correctamente por error simulado'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible completar el registro'
    });
  }
};

module.exports = {
  postRegistroCompleto
};