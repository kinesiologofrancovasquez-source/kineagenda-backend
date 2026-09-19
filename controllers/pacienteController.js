const pacienteService = require('../services/pacienteService');

// GET /pacientes
const getPacientes = async (req, res) => {
  try {
    const { nombre } = req.query;

    const pacientes = await pacienteService.obtenerPacientes(nombre);

    return res.status(200).json({
      status: 'success',
      message: 'Pacientes obtenidos correctamente',
      cantidad: pacientes.length,
      data: pacientes
    });
  } catch (error) {
    console.error('Error al obtener pacientes:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible obtener los pacientes'
    });
  }
};

// GET /pacientes/sql
// Consulta los pacientes utilizando una sentencia SQL manual.
const getPacientesConSql = async (req, res) => {
  try {
    const pacientes = await pacienteService.obtenerPacientesConSql();

    return res.status(200).json({
      status: 'success',
      message: 'Pacientes obtenidos mediante SQL manual',
      cantidad: pacientes.length,
      data: pacientes
    });
  } catch (error) {
    console.error(
      'Error al obtener pacientes mediante SQL:',
      error.message
    );

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible ejecutar la consulta SQL'
    });
  }
};

// POST /pacientes
const postPaciente = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body;

    if (!nombre || !apellido || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Nombre, apellido y email son obligatorios'
      });
    }

    const nuevoPaciente = await pacienteService.crearPaciente(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Paciente creado correctamente',
      data: nuevoPaciente
    });
  } catch (error) {
    console.error('Error al crear paciente:', error.message);

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

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible crear el paciente'
    });
  }
};

// PUT /pacientes/:id
const putPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await pacienteService.obtenerPacientePorId(id);

    if (!paciente) {
      return res.status(404).json({
        status: 'error',
        message: 'Paciente no encontrado'
      });
    }

    const pacienteActualizado =
      await pacienteService.actualizarPaciente(
        paciente,
        req.body
      );

    return res.status(200).json({
      status: 'success',
      message: 'Paciente actualizado correctamente',
      data: pacienteActualizado
    });
  } catch (error) {
    console.error('Error al actualizar paciente:', error.message);

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

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible actualizar el paciente'
    });
  }
};

// DELETE /pacientes/:id
const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await pacienteService.obtenerPacientePorId(id);

    if (!paciente) {
      return res.status(404).json({
        status: 'error',
        message: 'Paciente no encontrado'
      });
    }

    await pacienteService.eliminarPaciente(paciente);

    return res.status(200).json({
      status: 'success',
      message: 'Paciente eliminado correctamente',
      data: {
        id: paciente.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido
      }
    });
  } catch (error) {
    console.error('Error al eliminar paciente:', error.message);

    return res.status(500).json({
      status: 'error',
      message: 'No fue posible eliminar el paciente'
    });
  }
};

module.exports = {
  getPacientes,
  getPacientesConSql,
  postPaciente,
  putPaciente,
  deletePaciente
};